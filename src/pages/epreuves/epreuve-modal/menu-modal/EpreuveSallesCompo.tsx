import { colors, Stack, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TodayIcon from '@mui/icons-material/Today';

import IconRondV2 from "../../../../components/IconesRondV2";

import { themeEpreuves } from "../../../../theme/epreuves";

interface EpreuveSallesCompoProps {
    salle: string;
    nbEtudiants: number;
    nbEtuMMax: number;
    color?: string;
}

function couleurPourcentage(nbEtudiants: number, nbEtuMMax: number, color?: string): string {

    const couleurs = [color + "60", color + "80", color + "A0", color + "C0"];

    const pourcent = (nbEtudiants / nbEtuMMax) * 100;



    return couleurs[Math.min(Math.floor(pourcent / 25), 3)];
}


function EpreuveSallesCompo({ salle, nbEtudiants, nbEtuMMax, color }: EpreuveSallesCompoProps) {
    return (
        <Stack width={"100%"} direction="row" alignItems={"center"} justifyContent="space-between" bgcolor={colors.grey[200] + "60"} padding={1} borderColor={colors.blue[100]} borderRadius={2}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack alignItems={"center"} p={1} width={50} height={50} justifyContent={"center"} borderRadius={1} sx={{ bgcolor: couleurPourcentage(nbEtudiants, nbEtuMMax, color) }}>
                    <Typography fontWeight={"bold"}> {nbEtudiants} </Typography>
                </Stack>
                <Stack>
                    <Typography fontWeight={500}> {salle} </Typography>
                    <Typography sx={{ color: colors.grey[600] }}> {nbEtudiants} étudiants </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} p={1}>
                <IconRondV2 sx={{ bgcolor: color + "60", '&:hover': { bgcolor: color + "AF" } }} children={<SyncAltIcon />} tooltip="Echange" />
                <IconRondV2 sx={{ bgcolor: color + "60", '&:hover': { bgcolor: color + "AF" } }} children={<TodayIcon />} tooltip="Calendrier" />
                <IconRondV2 sx={{ bgcolor: color + "60", '&:hover': { bgcolor: color + "AF" } }} children={<MenuIcon />} tooltip="Détails" />
            </Stack>

        </Stack>
    );
}

export default EpreuveSallesCompo;