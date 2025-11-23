import React from "react";

import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";
import { type APIEpreuve } from "../../../contracts/epreuves";

import { Typography, Stack, Divider, colors } from "@mui/material";

import IconeRond from "../../../components/IconeRond";
import { TypoTitre } from "./TypoTitre";
import { TypoSousTitre } from "./TypoSousTitre";


import EditIcon from '@mui/icons-material/Edit';




export interface EpreuveModalProps {
    epreuve: APIEpreuve;
}


function calcHoraires(date: number, dureeMinutes: number): string {
    const dateConvert = new Date(date);

    const dateDebut = new Date(dateConvert.setHours(dateConvert.getHours(), dateConvert.getMinutes()));
    const dateFin = new Date(dateConvert.setHours(dateConvert.getHours(), dateConvert.getMinutes() + dureeMinutes));

    return dateDebut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + dateFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date: number): string {
    const dateConvert = new Date(date);
    return dateConvert.toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' });
}

export function EpreuveModal({ epreuve }: EpreuveModalProps) {
    const { fermer } = useModal();

    const [modifEpreuve, setModifEpreuve] = React.useState<boolean>(false);
    const [modifDate, setModifDate] = React.useState<boolean>(false);
    const [modifHoraire, setModifHoraire] = React.useState<boolean>(false);
    const [modifNbInscrits, setModifNbInscrits] = React.useState<boolean>(false);

    const [nouvelleValeur, setNouvelleValeur] = React.useState<string>("");

    React.useEffect(() => {
        console.log("EpreuveModal monté avec epreuve :", epreuve);
    }, [epreuve]);


    const handleModifEpreuve = () => { console.log("Modifier épreuve"); };
    const handleModifDate = () => { console.log("Modifier date"); };
    const handleModifHoraire = () => { console.log("Modifier horaire"); };
    const handleModifNbInscrits = () => { console.log("Modifier nombre inscrits"); };

    type TitreLigne = [string, string | null, () => void];

    const titres: TitreLigne[] = [
        ["Épreuve à venir", epreuve.nom && epreuve.code ? `${epreuve.nom} (${epreuve.code})` : null, handleModifEpreuve],
        ["Date", epreuve.date ? formatDate(epreuve.date) : null, handleModifDate],
        ["Horaires", epreuve.duree ? calcHoraires(epreuve.date, epreuve.duree) : null, handleModifHoraire],
        ["Nombre inscrits", epreuve.inscrits ? (`${epreuve.inscrits} inscrits`) : null, handleModifNbInscrits]
    ];





    return (
        <Modal titre="Mise en situation" onClose={fermer} >

            {/* Faudra mettre ce code dans un composant car 3 pages */}

            <Stack spacing={2} direction="row">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Stack spacing={3}  >
                        {titres.map(([titre, sousTitre, fonction], index) => (
                            <Stack direction="column" key={index}>

                                <TypoTitre>{titre}</TypoTitre>

                                <Stack direction="row" spacing={3} alignItems="center">
                                    {sousTitre ? <TypoSousTitre>{sousTitre}</TypoSousTitre> : <TypoSousTitre sx={{ color: "red" }} > Pas de données </TypoSousTitre>}

                                    <Stack
                                        sx={{ bgcolor: colors.blue[100], borderRadius: 100, padding: 0.75, cursor: 'pointer', '&:hover': { bgcolor: colors.blue[200] } }}

                                        onClick={fonction}
                                    >
                                        <EditIcon fontSize="small"  sx={{ color: "grey.700" }} />
                                    </Stack>

                                </Stack>
                            </Stack>

                        ))}
                    </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                </Stack>
            </Stack>
        </Modal>
    );
}