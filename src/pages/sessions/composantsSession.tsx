import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import type { SessionsStatut } from "../../contracts/sessions";
import { useNavigate } from "react-router-dom";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneIcon from '@mui/icons-material/Done';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ArchiveIcon from '@mui/icons-material/Archive';
import React from "react";

type CouleurStatut = { [key in SessionsStatut]: [string, string, React.ElementType] };
const Statut: CouleurStatut = {
    1: ["#A2D8B0", 'Active', HourglassBottomIcon],
    2: ["#D5D5D5", 'Terminée', DoneIcon],
    3: ["#80A4FF", 'Archivée', ArchiveIcon],
    4: ["#D8A2A3", 'En suppression', AutoDeleteIcon]
};

export function CarteDeSession({id, annee, nom, nombreStatut}: {id: number; annee: string; nom: string; nombreStatut: 1 | 2 | 3 | 4}): React.ReactElement {

    const navigate = useNavigate();

    return(
        <Paper key={id} elevation={1} sx={{borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>

            <Box sx={{justifyContent: 'space-between', width: '100%'}} onClick={() => navigate('/sessions/'+ id+'/epreuves')}>

                <Box sx={{display: 'flex', flexDirection: 'row', padding: '1em', gap: 4}}>
                    <Typography variant="h6" color="textSecondary">{annee} - {nom}</Typography>
                    <Chip sx={{bgcolor: Statut[nombreStatut][0], padding: '1em 0.5em'}} label={Statut[nombreStatut][1]} icon={React.createElement(Statut[nombreStatut][2])} />
                </Box>

                <Box alignSelf={'flex-end'} />
                
            </Box>

            <IconButton disabled sx={{marginRight: '0.5em'}}><MoreHorizIcon /></IconButton>
        </Paper>
    );
}

export function ButtonGererSession({icone, description, onClick}: {icone: React.ReactNode; description: string; onClick: () => void}): React.ReactElement {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', borderRadius: '10px', border: '2px solid #00000015', padding: '1em', justifyContent: 'space-evenly', flex: 1}} onClick={onClick}>
            <IconButton size="large" disabled>{icone}</IconButton>
            <Typography variant="subtitle1" color="textSecondary" textAlign={'center'}>{description}</Typography>
        </Box>
    );
}

