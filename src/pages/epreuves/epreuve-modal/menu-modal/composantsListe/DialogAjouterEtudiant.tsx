import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, CircularProgress, Stack } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { chercherSalles, type APISalle } from '../../../../../contracts/salles';
import { getEtudiant } from '../../../../../contracts/etudiants';
import BoutonStandard from '../../components/BoutonStantard';

interface DialogAjouterEtudiantProps {
    open: boolean;
    onClose: () => void;
    onAddEtudiant: (data: { numeroEtudiant: number; nom: string; prenom: string; codeSalle: string }) => void;
}

export default function DialogAjouterEtudiant(props: DialogAjouterEtudiantProps) {
    const [numeroEtudiant, setNumeroEtudiant] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [inputValueSalle, setInputValueSalle] = useState('');
    const [selectedSalle, setSelectedSalle] = useState<APISalle | null>(null);
    const [optionsSalle, setOptionsSalle] = useState<APISalle[]>([]);
    
    const [loadingSalle, setLoadingSalle] = useState(false);
    const [checkingEtudiant, setCheckingEtudiant] = useState(false);
    const [etudiantExiste, setEtudiantExiste] = useState(false);

    // Réinitialisation des champs à l'ouverture
    useEffect(() => {
        if (props.open) {
            setNumeroEtudiant('');
            setNom('');
            setPrenom('');
            setSelectedSalle(null);
            setInputValueSalle('');
            setEtudiantExiste(false);
        }
    }, [props.open]);

    // Détection d'un numéro d'étudiant et remplissage automatique
    useEffect(() => {
        const numEtu = parseInt(numeroEtudiant, 10);
        if (Number.isNaN(numEtu)) {
            setNom('');
            setPrenom('');
            setEtudiantExiste(false);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setCheckingEtudiant(true);
            try {
                const res = await getEtudiant(numEtu);
                if (res.status === 200 && res.data) {
                    setNom(res.data.nom);
                    setPrenom(res.data.prenom);
                    setEtudiantExiste(true);
                } else {
                    setNom('');
                    setPrenom('');
                    setEtudiantExiste(false);
                }
            } catch (error) {
                setNom('');
                setPrenom('');
                setEtudiantExiste(false);
            } finally {
                setCheckingEtudiant(false);
            }
        }, 500); // Délai d'attente de saisie de 500ms

        return () => clearTimeout(timeoutId);
    }, [numeroEtudiant]);

    // Recherche dynamique des salles
    useEffect(() => {
        const trimmed = inputValueSalle.trim();
        if (trimmed.length < 2) {
            setOptionsSalle([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoadingSalle(true);
            try {
                const res = await chercherSalles(trimmed);
                if (res.status === 200 && res.data) {
                    setOptionsSalle(res.data.salles);
                } else {
                    setOptionsSalle([]);
                }
            } catch (error) {
                setOptionsSalle([]);
            } finally {
                setLoadingSalle(false);
            }
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [inputValueSalle]);

    const handleConfirm = () => {
        const numEtu = parseInt(numeroEtudiant, 10);
        if (Number.isNaN(numEtu) || !selectedSalle || !nom || !prenom) return;
        
        props.onAddEtudiant({
            numeroEtudiant: numEtu,
            nom,
            prenom,
            codeSalle: selectedSalle.codeSalle
        });
        props.onClose();
    };

    const isFormValid = numeroEtudiant.trim() !== '' &&
                        nom.trim() !== '' &&
                        prenom.trim() !== '' &&
                        selectedSalle !== null &&
                        !checkingEtudiant;

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{ fontWeight: 700 }}>Ajouter un étudiant à l'épreuve</DialogTitle>
            <DialogContent sx={{ minWidth: { xs: 280, sm: 420 } }}>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Numéro étudiant"
                        variant="outlined"
                        fullWidth
                        value={numeroEtudiant}
                        onChange={(e) => setNumeroEtudiant(e.target.value.replace(/\D/g, ''))} // Uniquement des chiffres
                        slotProps={{
                            input: {
                                endAdornment: checkingEtudiant ? <CircularProgress size={20} /> : null
                            }
                        }}
                    />

                    <TextField
                        label="Nom"
                        variant="outlined"
                        fullWidth
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        disabled={etudiantExiste || checkingEtudiant}
                    />

                    <TextField
                        label="Prénom"
                        variant="outlined"
                        fullWidth
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        disabled={etudiantExiste || checkingEtudiant}
                    />

                    <Autocomplete
                        value={selectedSalle}
                        inputValue={inputValueSalle}
                        options={optionsSalle}
                        loading={loadingSalle}
                        filterOptions={(x) => x}
                        noOptionsText={inputValueSalle.trim().length < 2 ? 'Tapez au moins 2 caractères' : 'Aucune salle trouvée'}
                        isOptionEqualToValue={(option, value) => option.codeSalle === value.codeSalle}
                        getOptionLabel={(option) => `${option.codeSalle} - ${option.libelleSalle}`}
                        onChange={(_, value) => setSelectedSalle(value)}
                        onInputChange={(_, value, reason) => {
                            setInputValueSalle(value);
                            if (reason === 'input') {
                                setSelectedSalle(null);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Recherche de la salle"
                                placeholder="Code ou libellé de salle"
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loadingSalle ? <CircularProgress color="inherit" size={18} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <BoutonStandard width="100%" color={red[300]} onClick={props.onClose}>Annuler</BoutonStandard>
                <BoutonStandard width="100%" color={green[300]} disabled={!isFormValid} onClick={handleConfirm}>Ajouter</BoutonStandard>
            </DialogActions>
        </Dialog>
    );
}