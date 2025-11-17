import * as React from 'react';

import { TextField, Typography, Badge, Stack, Chip, Grow, Paper, InputBase, Button } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
import theme from '../theme/theme';
import LeftArrow from '@mui/icons-material/ArrowBackIosNew';

import IconeRond from './IconeRond';
import { de } from 'zod/v4/locales';

interface SearchBarProps {
    setNewSearchTerm: (value: string) => void;
    sessionName?: string;
    backToSessions: boolean;
    setBackToSessions: (value: boolean) => void;
}


function SearchBar(props: SearchBarProps) {

    const [searchTerm, setSearchTerm] = React.useState('');

    const [clickedSearch, setClickedSearch] = React.useState(false);


    const [defaultWidth, setDefaultWidth] = React.useState(50);

    const defaultHeight = 50;

    function handleSearch() {
        props.setNewSearchTerm(searchTerm);
    }

    function handleBackToSessions() {
        props.setBackToSessions(false);
    }

    React.useEffect(() => {
        setDefaultWidth(50 + (clickedSearch ? 20 : 0));

    }, [clickedSearch]);

    return (
        <Stack spacing={2} alignItems="center" direction={"row"}>

            {props.backToSessions && (
                <Paper sx={{ borderRadius: 10, height: defaultHeight }}>
                    <Button variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            height: defaultHeight,
                            borderRadius: 10,
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: theme.palette.primary.dark, boxShadow: 'none', cursor: 'pointer', transform: 'scaleX(1.05)' },
                            transition: 'background-color 0.3s ease , transform 0.5s ease',
                            maxWidth: 500,
                            textTransform: 'none',
                        
                        }}
                        startIcon={<LeftArrow />}
                        TouchRippleProps={{ color: theme.palette.primary.dark }}
                        onClick={handleBackToSessions}

                    >
                        <Typography noWrap fontWeight={500}>
                            {props.sessionName ? props.sessionName : 'Retour aux sessions'}
                        </Typography>
                    </Button>
                </Paper>

            )
            }

            <Paper
                sx={{
                    display: 'flex', alignItems: 'center', width: 600, borderRadius: 10, height: defaultHeight,
                    '&:hover': { bgcolor: grey[100], transform: 'scale(1.01)' },
                    transition: 'background-color 0.3s ease, transform 0.3s ease',

                }}
            >
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: '100%' }}>
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Rechercher un examen, une date, une salle..."
                        inputProps={{ 'aria-label': 'Rechercher un examen, une date, une salle...' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setClickedSearch(true)}
                        onBlur={() => setClickedSearch(false)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
                    />

                    <Stack sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: defaultHeight,
                        bgcolor: grey[300],
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        width: defaultWidth,
                        '&:hover': { bgcolor: grey[400], width: defaultWidth + 20 },
                        '&:active': { bgcolor: grey[500] },
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, width 0.3s ease',
                    }}
                        onClick={handleSearch}

                        aria-label="search"
                    >
                        <SearchIcon sx={{ mr: 2, ml: 2, color: grey[700] }} />
                    </Stack>

                </Stack>
            </Paper>


        </Stack >

    );
} export default SearchBar;