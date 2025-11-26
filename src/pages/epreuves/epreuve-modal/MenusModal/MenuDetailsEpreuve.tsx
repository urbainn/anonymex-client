import type { APIEpreuve } from "../../../../contracts/epreuves";
import React from "react";
import { Stack, Divider } from "@mui/material";
import { EpreuveCaracteristique } from "./EpreuveCaracteristique";


export interface DetailsEpreuveProps {
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


function DetailsEpreuve({ epreuve }: DetailsEpreuveProps) {

    const [modifEpreuve, setModifEpreuve] = React.useState<boolean>(false);
    const [modifDate, setModifDate] = React.useState<boolean>(false);
    const [modifHoraire, setModifHoraire] = React.useState<boolean>(false);
    const [modifNbInscrits, setModifNbInscrits] = React.useState<boolean>(false);

    const [nomEpreuve, setNomEpreuve] = React.useState<string>(epreuve.nom ? epreuve.nom : "Épreuve sans nom");
    const [dateEpreuve, setDateEpreuve] = React.useState<string>(epreuve.date ? formatDate(epreuve.date) : "Date non définie");
    const [horaireEpreuve, setHoraireEpreuve] = React.useState<string>((epreuve.date && epreuve.duree) ? calcHoraires(epreuve.date, epreuve.duree) : "Horaire non défini");
    const [nbInscritsEpreuve, setNbInscritsEpreuve] = React.useState<string>(epreuve.inscrits ? (`${epreuve.inscrits} inscrits`) : "Aucun inscrit");

    const handleModifEpreuve = () => {
        setModifEpreuve(true);
    };
    const handleModifDate = () => {
        setModifDate(true);
    };
    const handleModifHoraire = () => {
        setModifHoraire(true);
    };
    const handleModifNbInscrits = () => {
        setModifNbInscrits(true);
    };


    const handleSaveEpreuve = (newVal: string) => {
        setNomEpreuve(newVal);
        setModifEpreuve(false);
    };
    const handleSaveDate = (newVal: string) => {
        setDateEpreuve(newVal);
        setModifDate(false);
    };
    const handleSaveHoraire = (newVal: string) => {
        setHoraireEpreuve(newVal);
        setModifHoraire(false);
    };
    const handleSaveNbInscrits = (newVal: string) => {
        setNbInscritsEpreuve(newVal);
        setModifNbInscrits(false);
    };


    return (
        <>

            <Stack spacing={2} direction="row" p={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Stack spacing={3}  >
                        <EpreuveCaracteristique titre="Épreuve à venir" sousTitre={nomEpreuve} fonction={handleModifEpreuve} fonctionSave={handleSaveEpreuve} modif={modifEpreuve} type="text" />
                        <EpreuveCaracteristique titre="Date" sousTitre={dateEpreuve} fonction={handleModifDate} fonctionSave={handleSaveDate} modif={modifDate} type="date" />
                        <EpreuveCaracteristique titre="Horaires" sousTitre={horaireEpreuve} fonction={handleModifHoraire} fonctionSave={handleSaveHoraire} modif={modifHoraire} type="time" />
                        <EpreuveCaracteristique titre="Nombre inscrits" sousTitre={nbInscritsEpreuve} fonction={handleModifNbInscrits} fonctionSave={handleSaveNbInscrits} modif={modifNbInscrits} type="number" />
                    </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                </Stack>
            </Stack>

        </>);
}

export default DetailsEpreuve;