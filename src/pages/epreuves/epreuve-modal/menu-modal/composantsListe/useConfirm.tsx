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
import { red } from '@mui/material/colors';

interface StudentRow {
    numEtu: number;
    nom: string;
    prenom: string;
    salle: string;
    codeAnonymat: string;
    Note: number;
}

export function useConfirm() {
    const [ouvert, setOuvert] = useState(false);
    const [oldVal, setOldVal] = useState<StudentRow | any>("");
    const [newVal, setNewVal] = useState<StudentRow | any>("");

    const [resolver, setResolver] = useState<((value: StudentRow) => void) | null>(null);


    const confirm = (oldVal: StudentRow, newVal: StudentRow): Promise<StudentRow> => {
        setOldVal(oldVal);
        setNewVal(newVal);
        setOuvert(true);

        return new Promise(resolve => {
            setResolver(() => resolve);
        });
    };

    const handleClose = (value: StudentRow) => {
        setOuvert(false);
        resolver?.(value);
    };

    const changedValues = (oldVal: StudentRow, newVal: StudentRow): { changes: Partial<StudentRow>, old: Partial<StudentRow> } => {
        const old: Partial<StudentRow> = {};
        const changes: Partial<StudentRow> = {};

        (Object.keys(newVal) as (keyof StudentRow)[]).forEach((key) => {
            if (oldVal[key] !== newVal[key]) {
                changes[key] = newVal[key] as any;
                old[key] = oldVal[key] as any;
            }

        });

        return { changes, old };
    }


    const affichageDico = (dico: StudentRow): JSX.Element => {

        const change1 = changedValues(oldVal, newVal);
        console.log("Changements détectés :", change1);

        return <>
            {Object.entries(dico).map(([cle, valeur]) => {
                if (change1.changes.hasOwnProperty(cle)) return (
                    <Stack sx={{ flexDirection: "row", alignItems: "center", width: "100%" }} key={cle}>
                        <Typography sx={{ color: red[400] }} fontSize="large" fontWeight="600">{`${cle}: `}</Typography>
                        <Typography sx={{ color: red[400] }} fontSize="large" fontWeight="600" key={cle + "valeur"}>{` \u00A0${valeur}`}</Typography>
                    </Stack>
                )
                else return (
                    <Stack sx={{ flexDirection: "row", alignItems: "center", width: "100%" }} key={cle}>
                        <Typography fontSize="large" sx={{ color: "grey.800" }} fontWeight="400">{`${cle}: `}</Typography>
                        <Typography fontSize="large" fontWeight="500" key={cle + "valeur"}>{` \u00A0${valeur}`}</Typography>
                    </Stack>
                )

            }


            )}

        </>;
    }

    return {
        confirm,
        confirmDialog:
            <Modal open={ouvert} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200, margin: "auto" }}>
                <Stack >
                    <Stack height={20} bgcolor={colors.red[300]} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                    <Stack direction="column" spacing={4} p={4} alignItems="center" justifyContent="center" sx={{ bgcolor: colors.grey[200], borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Stack spacing={2}>
                            <Stack >
                                <Typography variant="h6" color={colors.grey[700]} >
                                    Vous allez modifier l'épreuve :
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"} sx={{ backgroundColor: colors.grey[300], pl: 1, pr: 1, borderRadius: 2 }}>
                                    {affichageDico(oldVal!)}
                                    <CloseIcon sx={{ color: colors.red[700] }} fontSize="large" />
                                </Stack>
                            </Stack>
                            <Stack>

                                <Typography variant="h6" color={colors.grey[700]} >
                                    Par la nouvelle :
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"} sx={{ backgroundColor: colors.grey[300], pl: 1, pr: 1, borderRadius: 2 }}   >

                                    {affichageDico(newVal!)}

                                    <CheckIcon sx={{ color: colors.green[700] }} fontSize="large" />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose(newVal!); }}>
                                Confirmer le changement
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: colors.red[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleClose(oldVal!); }}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>

    };
}
