import { Autocomplete, CircularProgress, Dialog, Stack, TextField, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { chercherSalles, type APISalle } from '../../../../../contracts/salles';
import BoutonStandard from '../../components/BoutonStantard';

interface DialogRechercheSalleProps {
    open: boolean;
    onClose: () => void;
    onSelectSalle: (codeSalle: string) => void;
}

export default function DialogRechercheSalle(props: DialogRechercheSalleProps) {
    const [inputValue, setInputValue] = useState('');
    const [selectedSalle, setSelectedSalle] = useState<APISalle | null>(null);
    const [options, setOptions] = useState<APISalle[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!props.open) {
            setInputValue('');
            setSelectedSalle(null);
            setOptions([]);
            setLoading(false);
        }
    }, [props.open]);

    useEffect(() => {
        if (!props.open) {
            return;
        }

        const trimmedValue = inputValue.trim();
        if (trimmedValue.length < 2) {
            setOptions([]);
            setLoading(false);
            return;
        }

        let stillActive = true;
        const timeoutId = window.setTimeout(async () => {
            setLoading(true);
            const res = await chercherSalles(trimmedValue);

            if (!stillActive) {
                return;
            }

            if (res.status === 200 && res.data) {
                setOptions(res.data.salles);
            } else {
                setOptions([]);
            }

            setLoading(false);
        }, 250);

        return () => {
            stillActive = false;
            window.clearTimeout(timeoutId);
        };
    }, [inputValue, props.open]);

    const handleConfirm = () => {
        if (!selectedSalle) {
            return;
        }

        props.onSelectSalle(selectedSalle.codeSalle);
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Stack p={2} spacing={2} minWidth={{ xs: 280, sm: 420 }}>
                <Typography variant="h6">Ajouter une salle</Typography>

                <Autocomplete
                    value={selectedSalle}
                    inputValue={inputValue}
                    options={options}
                    loading={loading}
                    filterOptions={(x) => x}
                    noOptionsText={inputValue.trim().length < 2 ? 'Tapez au moins 2 caracteres' : 'Aucune salle trouvee'}
                    isOptionEqualToValue={(option, value) => option.codeSalle === value.codeSalle}
                    getOptionLabel={(option) => `${option.codeSalle} - ${option.libelleSalle}`}
                    onChange={(_, value) => {
                        setSelectedSalle(value);
                    }}
                    onInputChange={(_, value, reason) => {
                        setInputValue(value);

                        if (reason === 'input') {
                            setSelectedSalle(null);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recherche d'une salle"
                            placeholder="Code ou libelle de salle"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={18} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />

                <Stack direction="row" spacing={2}>
                    <BoutonStandard width="100%" color={red[300]} onClick={props.onClose}>Annuler</BoutonStandard>
                    <BoutonStandard width="100%" color={green[300]} disabled={!selectedSalle} onClick={handleConfirm}>OK</BoutonStandard>
                </Stack>
            </Stack>
        </Dialog>
    );
}