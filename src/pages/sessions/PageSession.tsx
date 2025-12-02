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

    useEffect(() => {
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

        fetchSessions();
    }, []);

    console.log("sessions :", listeSession);

    return (
        <Stack flexDirection={'column'} margin={4}>
            
            <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems="center">
                <Stack flexDirection={'column'} alignItems="baseline">
                    <Typography variant="h4" color='#00000060'>Accueil</Typography>
                    <Typography variant="h3" color={theme.palette.text.primary} fontWeight="bold">
                        Anonymex
                    </Typography>
                </Stack>

                <Stack gap={4} flexDirection={'row'} alignSelf="flex-start">
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
                        sx={{ ml: 2 }}
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

            <Stack flexDirection={'column'} marginTop={20} width={'100%'}>
                {etape === "sessionVide" && <ComposantSessionVide />}
                {etape === "sessionRempli" && <ComposantSessionPleine listeSessions={listeSession} />}
            </Stack>

        </Stack>
    );
}