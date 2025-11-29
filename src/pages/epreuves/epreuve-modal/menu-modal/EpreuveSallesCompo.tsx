import { colors, Stack, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TodayIcon from '@mui/icons-material/Today';

import IconRondV2 from "../../../../components/IconesRondV2";

interface EpreuveSallesCompoProps {
    salle: string;
    nbEtudiants: number;
    nbEtuMMax: number;
}

function couleurPourcentage(nbEtudiants: number, nbEtuMMax: number): string {

    const couleurs = [colors.blue[100], colors.blue[200], colors.blue[300], colors.blue[400]]

    const pourcent = (nbEtudiants / nbEtuMMax) * 100;
    console.log("Pourcentage de remplissage:", pourcent);


    return couleurs[Math.min(Math.floor(pourcent / 25), 3)];
}


function EpreuveSallesCompo({ salle, nbEtudiants, nbEtuMMax }: EpreuveSallesCompoProps) {
    return (
        <Stack width={"100%"} direction="row" alignItems={"center"} justifyContent="space-between" bgcolor={colors.grey[200]} padding={1} borderRadius={2}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack alignItems={"center"} p={1} width={50} borderRadius={1} sx={{ bgcolor: couleurPourcentage(nbEtudiants, nbEtuMMax) }}>
                    <Typography fontWeight={"bold"}> {nbEtudiants} </Typography>
                </Stack>
                <Stack>
                    <Typography fontWeight={"bold"}> {salle} </Typography>
                    <Typography> {nbEtudiants} étudiants </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} p={1}>
                <IconRondV2 children={<SyncAltIcon />} tooltip="Echange" />
                <IconRondV2 children={<TodayIcon />} tooltip="Calendrier" />
                <IconRondV2 children={<MenuIcon />} tooltip="Détails" />
            </Stack>

        </Stack>
    );
}

export default EpreuveSallesCompo;