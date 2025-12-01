import { Box, IconButton, Paper, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import type { SessionsStatut } from "../../contracts/sessions";
import { useNavigate } from "react-router-dom";

type CouleurStatut = { [key in SessionsStatut]: [string, string] };
const Statut: CouleurStatut = {
    1: ["#A2D8B0", 'Active'],
    2: ["#D5D5D5", 'Terminée'],
    3: ["#80A4FF", 'Archivée'],
    4: ["#D8A2A3", 'En suppression']
};

export function CarteDeSession({id, annee, nom, nombreStatut}: {id: number; annee: string; nom: string; nombreStatut: 1 | 2 | 3 | 4}): React.ReactElement {

    const navigate = useNavigate();

    return(
        <Paper key={id} elevation={1} sx={{borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%'}} onClick={() => navigate('/sessions/'+ id+'/epreuves')}>
            <Box sx={{display: 'flex', flexDirection: 'row', padding: '1em', gap: 2, alignItems: 'center'}}>
                <Typography variant="h6" color="textSecondary">{annee} - {nom}</Typography>
                <Typography variant="caption" borderRadius="10px" padding="0.2em 0.5em" 
                bgcolor={Statut[nombreStatut][0]}>{Statut[nombreStatut][1]}</Typography>
            </Box>
            <IconButton disabled sx={{marginRight: '0.5em'}}><MoreHorizIcon /></IconButton>
        </Paper>
    );
}

export function ButtonGererSession({icone, description, onClick}: {icone: React.ReactNode; description: string; onClick: () => void}): React.ReactElement {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', borderRadius: '10px', border: '2px solid #00000015', padding: '1em'}} onClick={onClick}>
            <IconButton size="large" disabled>{icone}</IconButton>
            <Typography variant="body1" color="textSecondary">{description}</Typography>
        </Box>
    );
}

