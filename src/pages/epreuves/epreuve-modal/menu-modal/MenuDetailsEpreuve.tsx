import type { APIEpreuve } from "../../../../contracts/epreuves";
import React, { useState } from "react";
import { Stack, Divider, Button, colors, Alert } from "@mui/material";
import { EpreuveCaracteristique } from "./EpreuveCaracteristique";
import DateTextField from "./textfields/DateTextField";
import HorairesTextField from "./textfields/HorairesTextField";
import { TypoTitre } from "../TypoTitre";
import { TypoSousTitre } from "../TypoSousTitre";
import EpreuveSallesCompo from "./EpreuveSallesCompo";

import FolderIcon from '@mui/icons-material/Folder';

import ModalConfirmationChangements from "./ModalConfirmationChangements";
import { updateEpreuve } from "../../../../contracts/epreuves";

import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar'


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
    const [dateEpreuve, setDateEpreuve] = React.useState<number>(epreuve.date ? epreuve.date : 0);
    const [horaireEpreuve, setHoraireEpreuve] = React.useState<string>((epreuve.date && epreuve.duree) ? calcHoraires(epreuve.date, epreuve.duree) : "Horaire non défini");
    const [nbInscritsEpreuve] = React.useState<string>(epreuve.inscrits ? (`${epreuve.inscrits} inscrits`) : "Aucun inscrit");

    const [ouvrirModalDate, setOuvrirModalDate] = React.useState<boolean>(false);
    const [ouvrirModalHoraire, setOuvrirModalHoraire] = React.useState<boolean>(false);


    const [valIntermediaireDate, setValIntermediaireDate] = React.useState<number>(0);
    const [valIntermediaireHoraire, setValIntermediaireHoraire] = React.useState<string>("");

    const [snackOpen, setSnackOpen] = useState<boolean>(false)


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



    const confirmSaveDate = (newVal: number) => {

        console.log("Confirmation de la nouvelle date :", newVal);
        setValIntermediaireDate(newVal);
        setModifDate(false);
        setOuvrirModalDate(true);
    }

    const handleSaveDate = async (newVal: number) => {
        // Date arrive ici au format YYYY-MM-DD
        console.log("Sauvegarde de la date :", newVal);

        setModifDate(false);

        const timeString = horaireEpreuve.split(" - ")[0];
        const [hours, minutes] = timeString.split(":").map(Number);

    
        const date = new Date(newVal)
        date.setHours(hours)
        date.setMinutes(minutes)
        
        console.log(date)

        const dateTimestamp = date.getTime()

        console.log("Date en timestamp :", dateTimestamp);

        // Afficher chargement & erreur si besoin

        setDateEpreuve(dateTimestamp)
        setSnackOpen(true)
        const result = await updateEpreuve(epreuve.session, epreuve.code, { date: dateTimestamp })

    };

    const confirmSaveHoraire = (newVal: string) => {
        console.log("Confirmation du nouvel horaire :", newVal);
        setValIntermediaireHoraire(newVal);
        setModifHoraire(false);
        setOuvrirModalHoraire(true);
    }

    const handleSaveHoraire = async (newVal: string) => {
        console.log("Sauvegarde de l'horaire :", newVal);
        setModifHoraire(false);

        // newVal au format "HH:MM - HH:MM --> Transformer en durée

        const dureeParts = newVal.split(" - ");
        const heureDebut = dureeParts[0];
        const heureFin = dureeParts[1];

        const debutHeures = parseInt(heureDebut.split(":")[0], 10);
        const debutMinutes = parseInt(heureDebut.split(":")[1], 10);
        const finHeures = parseInt(heureFin.split(":")[0], 10);
        const finMinutes = parseInt(heureFin.split(":")[1], 10);

        const debutTotalMinutes = debutHeures * 60 + debutMinutes;
        const finTotalMinutes = finHeures * 60 + finMinutes;
        const duree = finTotalMinutes - debutTotalMinutes;

        console.log("Durée calculée :", duree);

        // Afficher chargement & erreur si besoin

        const result = await updateEpreuve(epreuve.session, epreuve.code, { duree: duree });
        if (result.status === 200 && result.data?.success === true) {
            console.log("Résultat de la mise à jour de la durée :", result)
            setHoraireEpreuve(newVal);
        } else {
            console.log("Erreur lors de la mise à jour de la durée :", result)
            setHoraireEpreuve(calcHoraires(epreuve.date ? epreuve.date : 0, epreuve.duree ? epreuve.duree : 0))
        };


        console.log("Résultat de la mise à jour de la durée :", result)
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

      const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };


    return (

        <>
            <ModalConfirmationChangements ouvert={ouvrirModalDate} setOuvert={setOuvrirModalDate} handleSave={handleSaveDate} oldVal={dateEpreuve} newVal={valIntermediaireDate} type="date" />
         {/*   <ModalConfirmationChangements ouvert={ouvrirModalHoraire} setOuvert={setOuvrirModalHoraire} handleSave={handleSaveHoraire} oldVal={horaireEpreuve} newVal={valIntermediaireHoraire} type="horaire" /> */}
 

 
        <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        
      >
        <Alert
        onClose={handleCloseSnack}
        severity="success"
        sx={{width:"100%"}}
        >
            Nouvelle date enregistrée
        </Alert>

        </Snackbar>

            <Stack spacing={4} direction="row" p={2} >
                <Stack width={"40%"} spacing={3}>
                    <EpreuveCaracteristique titre="Épreuve à venir" sousTitre={nomEpreuve} fonctionModif={handleModifEpreuve} modif={modifEpreuve} />
                    <EpreuveCaracteristique titre="Date" sousTitre={formatDate(dateEpreuve)} fonctionModif={handleModifDate} modif={modifDate} AdaptedTextField={() => (<DateTextField date={dateEpreuve} fonctionSave={confirmSaveDate} />)} />
                    <EpreuveCaracteristique titre="Horaires" sousTitre={horaireEpreuve} fonctionModif={handleModifHoraire} modif={modifHoraire} AdaptedTextField={() => (<HorairesTextField debut={horaireEpreuve.split(" - ")[0]} fin={horaireEpreuve.split(" - ")[1]} fonctionSave={confirmSaveHoraire} />)} />
                    <EpreuveCaracteristique titre="Nombre inscrits" sousTitre={nbInscritsEpreuve} fonctionModif={handleModifNbInscrits} modif={modifNbInscrits} />
                    <Stack>
                        <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} startIcon={<FolderIcon sx={{ color: colors.grey[800] }} />}>
                            Réimporter depuis le tableur
                        </Button>
                    </Stack>
                </Stack>

                <Divider orientation="vertical" flexItem />

                <Stack width={"60%"}  >
                    <TypoTitre>Répartition des étudiants</TypoTitre>
                    <Stack sx={{ height: 35 }} >
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
        </>
    );
}

export default DetailsEpreuve;