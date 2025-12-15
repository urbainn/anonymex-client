import { useState, useEffect } from "react";
import ComposantSessionVide from "./ComposantSessionVide";
import ComposantSessionPleine from "./ComposantSessionPleine";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import theme from "../../theme/theme";
import LinkIcon from '@mui/icons-material/Link';
import { getSessions } from "../../contracts/sessions";
import React from "react";
import { useNavigate } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import { Logout } from "@mui/icons-material";

export default function PageSession() {
    const [etape, setEtape] = useState<"sessionVide" | "sessionRempli" | null>(null);
    const [listeSession, setListeSession] = useState<Array<{annee: number; id: number; nom: string; statut: 1 | 2 | 3 | 4}>>([]);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function fetchSessions() {
        const response = await getSessions();
        if (response.status !== 200 || !response.data) {
            console.error("Erreur :", response.error || "Inconnue");
            return;
        }

        const sessions = response.data.sessions;
        setListeSession(sessions);
        setEtape(sessions.length === 0 ? "sessionVide" : "sessionRempli");
    }

    useEffect(() => {
        fetchSessions();
    }, []);

    console.log("sessions :", listeSession);

    return (
        <Stack flexDirection={'column'} margin={5}>
            
            <Stack justifyContent={'space-between'} flexDirection={'row'}>
                <Stack direction={"row"} gap={1} alignItems={'center'}>
                    <Typography variant="h4" color={theme.palette.text.primary} fontWeight="bold">Anonymex</Typography>
                    <Typography variant="h4" fontWeight={900} color='#00000050'>{'·'}</Typography>
                    <Typography variant="h4" color='#00000060'>Accueil</Typography>
                </Stack>

                <Stack flexDirection={'row'} alignSelf="flex-start" gap={1}>
                    <Button 
                        variant="contained"
                        disabled
                        color="primary"
                        startIcon={<LinkIcon />}
                        sx={{ borderRadius: '20px', textTransform: 'none' }}
                    >
                        Inviter un utilisateur
                    </Button>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>M</Avatar>
                    </IconButton>
                </Stack>
            </Stack>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{paper: {sx: {mt: 1.5}}}}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate("/settings")}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Paramètres
                </MenuItem>
                <MenuItem onClick={() => navigate("/")}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Se déconnecter
                </MenuItem>
            </Menu>

            <Stack flexDirection={'column'} marginTop={18} width={'100%'}>
                {etape === "sessionVide" && <ComposantSessionVide />}
                {etape === "sessionRempli" && <ComposantSessionPleine listeSessions={listeSession} fetchSessions={fetchSessions}/>}
            </Stack>

        </Stack>
    );
}