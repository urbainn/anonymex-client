import * as React from 'react';

import { TextField, Typography, Badge, Stack, Chip } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export default function MenuLateralSession() {

    const [derniereAnnee, setDerniereAnnee] = React.useState<number>(2025);
    const [premiereAnnee, setPremiereAnnee] = React.useState<number>(2020);
    const [annees, setAnnees] = React.useState<number[]>([]);
    const [textFieldVisible, setTextFieldVisible] = React.useState<boolean>(false);


    const iconColor = 'grey.700';

    const buttonSx = {
        display: "flex",
        flexDirection: "row",
        padding: 1,
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { backgroundColor: "action.hover" },
        pb: 2,
        pt: 2,
        pl: 2
    }



    React.useEffect(() => {
        const newAnnees: number[] = [];
        for (let year = derniereAnnee; year >= premiereAnnee; year--) {
            newAnnees.push(year);
        }
        setAnnees(newAnnees);
    }, [premiereAnnee, derniereAnnee]);


    type SessionStatus = 1 | 2 | 3;

    interface Session {
        id: number,
        annee: number,
        nom: string,
        status: SessionStatus,
        incidents: number
    }

    const sessionStatusTextes: Record<SessionStatus, string> = {
        1: 'En cours',
        2: 'Terminé',
        3: 'Archivé'
    }

    const sessionStatusColors: Record<SessionStatus, 'success' | 'default' | 'default'> = {
        1: 'success',
        2: 'default',
        3: 'default'
    }



    const sessionsList: { anneeMin: number, anneeMax: number, sessions: Record<number, Session[]> } = {
        anneeMin: 2020,
        anneeMax: 2025,
        sessions:
        {
            2025: [{ id: 1, annee: 2025, nom: "session 1 pair", status: 1, incidents: 0 },
            { id: 2, annee: 2025, nom: "session 2 impair", status: 2, incidents: 1 }]
            ,
            2024: [{ id: 3, annee: 2024, nom: "session 1 pair", status: 3, incidents: 0 },
            { id: 4, annee: 2024, nom: "session 1 a", status: 2, incidents: 2 }]
            ,
            2023: [{ id: 5, annee: 2023, nom: "session 2 pair", status: 1, incidents: 0 },
            { id: 6, annee: 2023, nom: "session 2 impair", status: 3, incidents: 5 },
            { id: 7, annee: 2023, nom: "session 3 impair", status: 2, incidents: 0 }]
            ,
            2022: [{ id: 8, annee: 2022, nom: "session 1 pair", status: 2, incidents: 0 }
            ],
            2021: [{ id: 9, annee: 2021, nom: "session 1 impair", status: 3, incidents: 0 }
            ],
            2020: [{ id: 10, annee: 2020, nom: "session 1 pair", status: 2, incidents: 0 }
            ]
        }
    }

    function toggleTextField() {
        setTextFieldVisible(!textFieldVisible);
    }



    return (

        <div>

            Bonjour

            <Drawer
                variant="permanent"
                anchor="left"
                sx={{

                    flexShrink: 0,
                    "& .MuiDrawer-paper": {

                        boxSizing: "border-box",
                        backgroundColor: "#F7F2FA",

                    },
                }}
            >

                <Box sx={{
                    width: 350,
                    p: 2,



                }} >



                    <List>
                        <Stack spacing={2} sx={{ pb: 2 }}>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pl: 2, pr: 2 }}>

                                {!textFieldVisible && (

                                    <Typography variant="subtitle1" >
                                        Anonymex
                                    </Typography>
                                )}

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    {textFieldVisible && (
                                        <Stack alignItems="center">
                                            <TextField
                                                variant="standard"
                                                placeholder="Rechercher..."
                                                InputProps={{ disableUnderline: true }}
                                                sx={{ width: '100%', '&:hover': { bgcolor: 'grey.200' } }}
                                            />
                                        </Stack>
                                    )}

                                    <Stack >
                                        <IconButton edge="end" aria-label="search" onClick={() => { toggleTextField(); }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Stack>


                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{ ...buttonSx, bgcolor: "grey.300", borderRadius: 15, ":hover": { bgcolor: "grey.400" } }}

                            >
                                <AddIcon sx={{ color: iconColor }} />

                                <Typography sx={{ marginLeft: 2 }}> Créer une nouvelle session</Typography>
                            </Stack>


                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={buttonSx}
                            >
                                <SettingsIcon sx={{ color: iconColor }} />
                                <Typography sx={{ marginLeft: 2 }}>Configurer</Typography>
                            </Stack>
                        </Stack>


                        {annees.map((annee) =>
                            <React.Fragment key={annee}>

                                {sessionsList.sessions[annee] ? (
                                    <>
                                        <Divider />
                                        <Stack sx={{ pt: 1 }}>
                                            <Typography
                                                variant="body1"
                                                align="left"
                                                fontWeight="bold"
                                                sx={{ paddingLeft: 1, paddingTop: 1, paddingBottom: 1 }}
                                            >
                                                {annee}
                                            </Typography>
                                        </Stack>

                                        <Stack>
                                            {sessionsList.sessions[annee].map((session) => (
                                                <Stack
                                                    key={session.id}
                                                    sx={buttonSx}
                                                >
                                                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                                                        <Stack direction="row" alignItems="center">

                                                            <Badge badgeContent={session.incidents} color="error">
                                                                <FolderIcon sx={{ color: iconColor }} />
                                                            </Badge>

                                                            <Typography sx={{ marginLeft: 2 }}>{session.nom}</Typography>
                                                        </Stack>
                                                        <Stack>
                                                            <Chip label={sessionStatusTextes[session.status]} variant="filled" size='small' color={sessionStatusColors[session.status]} />
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </>
                                ) : <></>
                                }
                            </React.Fragment>

                        )}


                    </List>


                </Box>
            </Drawer>
        </div >
    );
}
