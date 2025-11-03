import * as React from 'react';
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
import { TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export default function MyDrawer() {
    const [open, setOpen] = React.useState(false);

    const sessionsList: Record<string, Record<0 | 1, string[]>> =
    {
        2025: { 0: ["session 1", "session 2"], 1: ["session 1", "session 2"] },
        2024: { 0: ["session 1", "session 2"], 1: ["session 1", "session 2"] },
    };

    // exemple de structure (0 et 1 pour impair et pair)


    return (

        <div>

            Bonjour

            <Drawer
                variant="permanent"
                anchor="left"

            >

                <Box sx={{
                    width: 400,
                    p: 2,
                }} >



                    <List>
                        <Box display="flex" alignContent="center" sx={{ direction: "row", pb: 2 }}>

                            <Typography variant="subtitle1" align="left" sx={{ p: 1, pr: 2 }}>
                                Anonymex
                            </Typography>

                            <ListItem disablePadding>
                                <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TextField variant="standard" />
                                    </Box>
                                    <IconButton edge="end" aria-label="delete">
                                        <SearchIcon />
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        </Box>

                        <ListItem disablePadding sx={{ borderRadius: 15, bgcolor: "grey.300" }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Créer une nouvelle session" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Configurer" />
                            </ListItemButton>
                        </ListItem>

                        {Object.entries(sessionsList)
                            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                            .map(([year, sessionObj]) => (
                                <>
                                    <Divider />
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            align="left"
                                            sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}
                                        >
                                            {year}
                                        </Typography>
                                    </Box>

                                    {Object.values(sessionObj).map((sessionList, idx) =>
                                        sessionList.map((session) => (
                                            <ListItem disablePadding sx={{ m: 0, p: 0 }}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <FolderIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={session + (idx % 2 === 0 ? " pair" : " impair")} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    )}
                                </>
                            ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}
