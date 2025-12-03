import type { APIEpreuve } from "../../../../contracts/epreuves";
import React, { use, useEffect, useState } from "react";
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

import ModalConfirmationChangementsHoraire from "./ModalConfirmationChangements copy";

import { useSnackbarGlobal } from '../../../../contexts/SnackbarContext';

import { themeEpreuves } from "../../../../theme/epreuves";

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

    const [dureeMinutes, setDureeMinutes] = React.useState<number>(epreuve.duree ? epreuve.duree : 0);


    const [nbInscritsEpreuve] = React.useState<string>(epreuve.inscrits ? (`${epreuve.inscrits} inscrits`) : "Aucun inscrit");

    const [ouvrirModalDate, setOuvrirModalDate] = React.useState<boolean>(false);
    const [ouvrirModalHoraire, setOuvrirModalHoraire] = React.useState<boolean>(false);


    const [valIntermediaireDate, setValIntermediaireDate] = React.useState<number>(0);

    const [valIntermediaireDuree, setValIntermediaireDuree] = React.useState<number>(0);
    const [valIntermediaireHoraireDebut, setValIntermediaireHoraireDebut] = React.useState<number>(0);
    const { afficherErreur } = useSnackbarGlobal()

    useEffect(() => {
        console.log("Duree minutes mise à jour :", dureeMinutes);
        console.log("Date épreuve mise à jour :", new Date(dateEpreuve));
    }, [dateEpreuve, dureeMinutes]);

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

        console.log("Sauvegarde de la date :", newVal);

        setModifDate(false);

        console.log("Date en timestamp :", newVal);

        // Afficher chargement & erreur si besoin

        const result = await updateEpreuve(epreuve.session, epreuve.code, { date: newVal })

        if (result.status == 200) {
            console.log("Mise à jour de la date réussie");
            setDateEpreuve(newVal)
        } else {
            afficherErreur("La mise à jour de la date a échoué. Veuillez réessayer.")
        }

        console.log("Résultat de la mise à jour de la date :", result)

    };


    const confirmSaveHoraire = (debut: number, fin: number) => {
        console.log("Confirmation du nouvel horaire :", debut, fin);
        setValIntermediaireHoraireDebut(debut);
        setValIntermediaireDuree((fin - debut) / (1000 * 60));

        setModifHoraire(false);
        setOuvrirModalHoraire(true);
    }

    const handleSaveHoraire = async (date: number, duree: number) => {

        setModifHoraire(false);

        console.log("Sauvegarde de l'horaire :", date, "durée :", duree);
        const result = await updateEpreuve(epreuve.session, epreuve.code, { date: date, duree: duree });

        if (result.status == 200) {
            console.log("Mise à jour de l'horaire réussie");
            setDateEpreuve(date);
            setDureeMinutes(duree);

        } else {
            afficherErreur("La mise à jour de l'horaire a échoué. Veuillez réessayer.")
        }
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



    return (

        <>
            <ModalConfirmationChangements ouvert={ouvrirModalDate} setOuvert={setOuvrirModalDate} handleSave={handleSaveDate} oldVal={dateEpreuve} newVal={valIntermediaireDate} type="date" />
            <ModalConfirmationChangementsHoraire ouvert={ouvrirModalHoraire} setOuvert={setOuvrirModalHoraire} handleSave={handleSaveHoraire} ancien={{ date: dateEpreuve, duree: dureeMinutes }} nouveau={{ date: valIntermediaireHoraireDebut, duree: valIntermediaireDuree }} />


            <Stack spacing={4} direction="row" p={2} >
                <Stack width={"40%"} spacing={3}>
                    <EpreuveCaracteristique titre="Épreuve à venir" sousTitre={nomEpreuve} fonctionModif={handleModifEpreuve} modif={modifEpreuve} color={themeEpreuves.status[epreuve.statut]} />
                    <EpreuveCaracteristique titre="Date" sousTitre={formatDate(dateEpreuve)} fonctionModif={handleModifDate} modif={modifDate} AdaptedTextField={() => (<DateTextField date={dateEpreuve} fonctionSave={confirmSaveDate} />)} color={themeEpreuves.status[epreuve.statut]} />
                    <EpreuveCaracteristique titre="Horaires" sousTitre={calcHoraires(dateEpreuve, dureeMinutes)} fonctionModif={handleModifHoraire} modif={modifHoraire} AdaptedTextField={() => (<HorairesTextField date={dateEpreuve} dureeMinutes={dureeMinutes} fonctionSave={confirmSaveHoraire} />)} color={themeEpreuves.status[epreuve.statut]} />
                    <EpreuveCaracteristique titre="Nombre inscrits" sousTitre={nbInscritsEpreuve} fonctionModif={handleModifNbInscrits} modif={modifNbInscrits} color={themeEpreuves.status[epreuve.statut]} />
                    <Stack>
                        <Button variant="contained" sx={{ bgcolor: themeEpreuves.status[epreuve.statut] + "60", color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} startIcon={<FolderIcon sx={{ color: colors.grey[800] }} />}>
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

                        <EpreuveSallesCompo salle="Amphi 5.05" nbEtudiants={252} nbEtuMMax={252} color={themeEpreuves.status[epreuve.statut]} />
                        <EpreuveSallesCompo salle="Amphi 5.03" nbEtudiants={130} nbEtuMMax={252} color={themeEpreuves.status[epreuve.statut]} />
                        <EpreuveSallesCompo salle="Amphi 36.3" nbEtudiants={60} nbEtuMMax={252} color={themeEpreuves.status[epreuve.statut]} />
                        <EpreuveSallesCompo salle="Amphi 36.01" nbEtudiants={14} nbEtuMMax={252} color={themeEpreuves.status[epreuve.statut]} />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default DetailsEpreuve;