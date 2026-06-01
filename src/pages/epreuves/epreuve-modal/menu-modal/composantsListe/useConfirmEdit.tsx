import { useState } from 'react';
import type { APIConvocation } from '../../../../../contracts/convocations';
import ModalConfirmationBase from '../composantsEpreuves/ModalConfirmationBase';
import { Snackbar, Alert } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import type { SyntheticEvent } from 'react';

type LibellesChampsConvocation = Partial<Record<keyof APIConvocation, string>>;

function formatValeur(valeur: string | number | undefined): string {
    if (valeur === '' || valeur === undefined) {
        return 'N/A';
    }

    return String(valeur);
}

function getChangements(oldVal: APIConvocation | null, newVal: APIConvocation | null) {
    if (!oldVal || !newVal) {
        return [] as Array<{ champ: keyof APIConvocation; ancien: string; nouveau: string }>;
    }

    const keys = Object.keys(newVal) as (keyof APIConvocation)[];

    return keys
        .filter((key) => oldVal[key] !== newVal[key])
        .map((key) => ({
            champ: key,
            ancien: formatValeur(oldVal[key]),
            nouveau: formatValeur(newVal[key])
        }));
}

export function useConfirmEdit() {
    const [ouvert, setOuvert] = useState(false);
    const [oldVal, setOldVal] = useState<APIConvocation | null>(null);
    const [newVal, setNewVal] = useState<APIConvocation | null>(null);
    const [libellesChamps, setLibellesChamps] = useState<LibellesChampsConvocation>({});

    const [resolver, setResolver] = useState<((value: APIConvocation | null) => void) | null>(null);

    // Snackbar states
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


    const confirm = (
        oldVal: APIConvocation,
        newVal: APIConvocation,
        libelles?: LibellesChampsConvocation
    ): Promise<APIConvocation | null> => {
        setOldVal(oldVal);
        setNewVal(newVal);
        setLibellesChamps(libelles ?? {});
        setOuvert(true);

        return new Promise(resolve => {
            setResolver(() => resolve);
        });
    };

    const handleClose = (value: APIConvocation | null) => {
        setOuvert(false);
        resolver?.(value);
        setResolver(null);
        setLibellesChamps({});
    };

    const handleSnackbarClose = (_: Event | SyntheticEvent, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const showSuccess = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const showError = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    };

    const changements = getChangements(oldVal, newVal);
    const ancienTexte = changements.length > 0
        ? changements.map(({ champ, ancien }) => `${libellesChamps[champ] ?? String(champ)}: ${ancien}`).join(' | ')
        : 'Aucun changement';
    const nouveauTexte = changements.length > 0
        ? changements.map(({ champ, nouveau }) => `${libellesChamps[champ] ?? String(champ)}: ${nouveau}`).join(' | ')
        : 'Aucun changement';


    return {
        confirm,
        showSuccess,
        showError,
        confirmModalEdit:
            <ModalConfirmationBase
                ouvert={ouvert}
                onClose={() => {
                    handleClose(null);
                }}
                onConfirmer={() => {
                    handleClose(newVal);
                }}
                titre="Confirmer la modification"
                ancienLabel="Valeurs actuelles"
                ancienValeur={ancienTexte}
                nouveauLabel="Nouvelles valeurs"
                nouveauValeur={nouveauTexte}
                texteConfirmation="Confirmer la modification"
                texteAnnulation="Annuler"
            />,
        snackbarEdit: (
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbarSeverity} variant='filled'>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        )
    };
}
