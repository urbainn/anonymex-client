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


export function useConfirmTransfer() {
    const [ouvert, setOuvert] = useState(false);
    const [students, setStudents] = useState<number[]>([]);
    const [salle, setSalle] = useState<string>("");

    const [resolver, setResolver] = useState<((value: number[], salle: string) => void) | null>(null);


    const confirmTransfer = (students: number[], salle: string): Promise<number[]> => {
        setStudents(students);
        setSalle(salle);
        setOuvert(true);

        return new Promise(resolve => {
            setResolver(() => resolve);
        });
    };

    const handleClose = (value: number[], salle: string) => {
        setOuvert(false);
        resolver?.(value, salle);
    };

    const affichageListe = (etudiant: number): JSX.Element => {

        return <>
            <Typography sx={{ color: grey[900] }} variant="h5" fontWeight="500">{`Numéro Étudiant: `}</Typography>
            <Typography sx={{ color: grey[900] }} variant='h5' fontWeight="800" key={etudiant + "valeur"}>{` \u00A0${etudiant}`}</Typography>
        </>;
    }

    return {
        confirmTransfer,
        confirmModalTransfer:
            <Modal open={ouvert} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200, margin: "auto" }}>
                <Stack >
                    <Stack height={20} bgcolor={colors.red[300]} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    <Stack direction="column" spacing={4} p={4} alignItems="center" justifyContent="center" sx={{ bgcolor: colors.grey[200], borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Stack spacing={2}>
                            <Stack >
                                <Typography variant="h6" color={colors.grey[700]} >
                                    Vous allez deplacer :
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"} sx={{ pl: 1, pr: 1, borderRadius: 2 }}>
                                    {students.map(affichageListe)}
                                    <CloseIcon sx={{ color: colors.red[700] }} fontSize="large" />
                                </Stack>
                            </Stack>
                            <Stack>

                                <Typography variant="h6" color={colors.grey[700]} >
                                    Dans :
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"} sx={{ pl: 1, pr: 1, borderRadius: 2 }}   >

                                    {salle}
                                    <Typography sx={{ color: grey[900] }} variant="h5" fontWeight="800" key={"salle"}>{` \u00A0${salle}`}</Typography>

                                    <CheckIcon sx={{ color: colors.green[700] }} fontSize="large" />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose(students, salle); }}>
                                Confirmer le changement
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: colors.red[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose([], ""); }}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>

    };
}
