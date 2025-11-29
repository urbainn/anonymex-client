import type { APIEpreuve } from "../../../../contracts/epreuves";
import React from "react";
import { Stack, Divider, Button, colors } from "@mui/material";
import { EpreuveCaracteristique } from "./EpreuveCaracteristique";
import DateTextField from "./textfields/DateTextField";
import HorairesTextField from "./textfields/HorairesTextField";
import { TypoTitre } from "../TypoTitre";
import { TypoSousTitre } from "../TypoSousTitre";
import EpreuveSallesCompo from "./EpreuveSallesCompo";

import FolderIcon from '@mui/icons-material/Folder';


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
    console.log(date);
    const dateConvert = new Date(date);
    return dateConvert.toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' });
}


function DetailsEpreuve({ epreuve }: DetailsEpreuveProps) {

    const [modifEpreuve, setModifEpreuve] = React.useState<boolean>(false);
    const [modifDate, setModifDate] = React.useState<boolean>(false);
    const [modifHoraire, setModifHoraire] = React.useState<boolean>(false);
    const [modifNbInscrits, setModifNbInscrits] = React.useState<boolean>(false);

    const [nomEpreuve] = React.useState<string>(epreuve.nom ? epreuve.nom : "Épreuve sans nom");
    const [dateEpreuve, setDateEpreuve] = React.useState<string>(epreuve.date ? formatDate(epreuve.date) : "Date non définie");
    const [horaireEpreuve, setHoraireEpreuve] = React.useState<string>((epreuve.date && epreuve.duree) ? calcHoraires(epreuve.date, epreuve.duree) : "Horaire non défini");
    const [nbInscritsEpreuve] = React.useState<string>(epreuve.inscrits ? (`${epreuve.inscrits} inscrits`) : "Aucun inscrit");

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



    const handleSaveDate = (newVal: string) => {
        const date = new Date(newVal);
        setDateEpreuve(date.toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' }));
        setModifDate(false);
    };
    const handleSaveHoraire = (newVal: string) => {
        setHoraireEpreuve(newVal);
        setModifHoraire(false);
    };

    {/* 

    const handleSaveEpreuve = (newVal: string) => {
        setNomEpreuve(newVal);
        setModifEpreuve(false);
    };

    const handleSaveNbInscrits = (newVal: string) => {
        setNbInscritsEpreuve(newVal);
        setModifNbInscrits(false);
    };

    */}

    return (
        <>

            <Stack spacing={4} direction="row" p={2} >
                <Stack width={"40%"} spacing={3}>
                    <EpreuveCaracteristique titre="Épreuve à venir" sousTitre={nomEpreuve} fonctionModif={handleModifEpreuve} modif={modifEpreuve} />
                    <EpreuveCaracteristique titre="Date" sousTitre={dateEpreuve} fonctionModif={handleModifDate} modif={modifDate} AdaptedTextField={() => (<DateTextField date={dateEpreuve} fonctionSave={handleSaveDate} />)} />
                    <EpreuveCaracteristique titre="Horaires" sousTitre={horaireEpreuve} fonctionModif={handleModifHoraire} modif={modifHoraire} AdaptedTextField={() => (<HorairesTextField debut={horaireEpreuve.split(" - ")[0]} fin={horaireEpreuve.split(" - ")[1]} fonctionSave={handleSaveHoraire} />)} />
                    <EpreuveCaracteristique titre="Nombre inscrits" sousTitre={nbInscritsEpreuve} fonctionModif={handleModifNbInscrits} modif={modifNbInscrits} />
                    <Stack>
                        <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1 }} startIcon={<FolderIcon sx={{ color: colors.grey[800] }} />}>
                            Réimporter depuis le tableur
                        </Button>
                    </Stack>
                </Stack>

                <Divider orientation="vertical" flexItem />

                <Stack width={"60%"}  >
                    <TypoTitre>Répartition des étudiants</TypoTitre>
                    <Stack sx={{ height: 40, py: 0.5 }} >
                        <TypoSousTitre >Cliquez pour afficher la composition</TypoSousTitre>
                    </Stack>
                    <Stack spacing={1} pt={3} maxHeight={400} overflow="auto">
                        <EpreuveSallesCompo salle="Amphi 36.3" nbEtudiants={60} nbEtuMMax={252} />
                        <EpreuveSallesCompo salle="Amphi 5.05" nbEtudiants={252} nbEtuMMax={252} />
                        <EpreuveSallesCompo salle="Amphi 36.01" nbEtudiants={14} nbEtuMMax={252} />
                        <EpreuveSallesCompo salle="Amphi 5.03" nbEtudiants={130} nbEtuMMax={252} />
                    </Stack>
                </Stack>
            </Stack>

        </>);
}

export default DetailsEpreuve;