import { Box, IconButton, Paper, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import type { SessionsStatut } from "../../contracts/sessions";



export function CarteDeSession({date, titre, status}: {date: string; titre: string; status: SessionsStatut}): React.ReactElement {
    return(
        <Paper elevation={1} sx={{borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', padding: '1em', gap: 2, alignItems: 'center'}}>
                <Typography variant="h6" color="textSecondary">{date} - {titre}</Typography>
                <Typography variant="caption" borderRadius="10px" padding="0.2em 0.5em" bgcolor={(typeof status === "string" && status === "Active") ? "#A2D8B0" : (typeof status === "string" && status === "Terminée") ? "#D5D5D5" : (typeof status === "string" && status === "Archivée") ? "#80A4FF" : "#D8A2A3"}>{status}</Typography>
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

