import { Box, Chip, IconButton, ListItemIcon, Menu, MenuItem, Paper, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import type { SessionsStatut } from "../../contracts/sessions";
import { useNavigate } from "react-router-dom";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneIcon from '@mui/icons-material/Done';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ArchiveIcon from '@mui/icons-material/Archive';
import React from "react";
import { DeleteForever, Settings } from "@mui/icons-material";

type CouleurStatut = { [key in SessionsStatut]: [string, string, React.ElementType] };
const Statut: CouleurStatut = {
    1: ["#A2D8B0", 'Active', HourglassBottomIcon],
    2: ["#D5D5D5", 'Terminée', DoneIcon],
    3: ["#80A4FF", 'Archivée', ArchiveIcon],
    4: ["#D8A2A3", 'En suppression', AutoDeleteIcon]
};

export function CarteDeSession({id, annee, nom, nombreStatut}: {id: number; annee: string; nom: string; nombreStatut: 1 | 2 | 3 | 4}): React.ReactElement {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    return(
        <Paper key={id} variant="outlined" sx={{borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Box sx={{justifyContent: 'space-between', width: '100%'}} onClick={() => navigate('/sessions/'+ id+'/epreuves')}>

                <Box sx={{display: 'flex', flexDirection: 'row', padding: '1em', gap: 4}}>
                    <Typography variant="h6" color="textSecondary">{annee} - {nom}</Typography>
                    <Chip sx={{bgcolor: Statut[nombreStatut][0], padding: '1em 0.5em'}} label={Statut[nombreStatut][1]} icon={React.createElement(Statut[nombreStatut][2])} />
                </Box>

                <Box alignSelf={'flex-end'} />

            </Box>

            <IconButton 
                onClick={handleClick} 
                sx={{marginRight: '0.5em'}} 
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreHorizIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px #3f51b533)',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {}}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Modifier la session
                </MenuItem>
                <MenuItem onClick={() => {}}>
                <ListItemIcon>
                    <DeleteForever fontSize="small" />
                </ListItemIcon>
                Supprimer la session
                </MenuItem>
            </Menu>
        </Paper>
    );
}

export function ButtonGererSession({icone, description, onClick}: {icone: React.ReactNode; description: string; onClick: () => void}): React.ReactElement {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', borderRadius: '10px', border: '2px solid #00000015', padding: '1em', justifyContent: 'space-evenly', flex: 1}} onClick={onClick}>
            <IconButton size="large">{icone}</IconButton>
            <Typography variant="h6" sx={{fontWeight: "400"}} color="textSecondary" textAlign={'center'}>{description}</Typography>
        </Box>
    );
}

