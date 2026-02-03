import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Modal,
    Stack
} from '@mui/material';


import { colors } from "@mui/material";
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import type { JSX } from '@emotion/react/jsx-runtime';
import { grey, red } from '@mui/material/colors';


export function useConfirmDelete() {
    const [ouvert, setOuvert] = useState(false);
    const [students, setStudents] = useState<number[]>([]);
    const [nbStudents, setNbStudents] = useState<number>(0);

    const [resolver, setResolver] = useState<((value: number[]) => void) | null>(null);


    const confirmDelete = (students: number[]): Promise<number[]> => {
        setStudents(students);
        setNbStudents(students.length);
        setOuvert(true);

        return new Promise(resolve => {
            setResolver(() => resolve);
        });
    };

    const handleClose = (value: number[]) => {
        setOuvert(false);
        resolver?.(value);
    };

    const affichageListe = (etudiant: number): JSX.Element => {

        return <>
            <Typography sx={{ color: grey[900] }} variant="h5" fontWeight="500">{`Numéro Étudiant: `}</Typography>
            <Typography sx={{ color: grey[900] }} variant='h5' fontWeight="800" key={etudiant + "valeur"}>{` \u00A0${etudiant}`}</Typography>
        </>;
    }

    return {
        confirmDelete,
        confirmModalDelete:
            <Modal open={ouvert} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200, margin: "auto" }}>
                <Stack >
                    <Stack height={20} bgcolor={colors.red[300]} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    <Stack direction="column" spacing={4} p={4} alignItems="center" justifyContent="center" sx={{ bgcolor: colors.grey[200], borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Stack spacing={2}>
                            <Stack >
                                <Typography variant="h6" color={colors.grey[700]} >
                                    Vous allez supprimer: <Typography component="span" color={colors.grey[900]} variant="h6" fontWeight={800}>{nbStudents}</Typography>  étudiant{nbStudents > 1 ? 's' : ''}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose(students); }}>
                                Confirmer le changement
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: colors.red[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose([]); }}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>

    };
}
