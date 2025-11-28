import * as React from 'react';

import { TextField, Typography, Badge, Stack, Chip, Grow, Paper, InputBase, Button, Tooltip } from '@mui/material';

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
import { FormatListBulleted } from '@mui/icons-material';

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
        <Stack spacing={2} alignItems="center" justifyContent={"center"} direction={"row"} width={'100%'}>

            <Tooltip title="Changer de session">
                <Button startIcon={<LeftArrow />}
                    onClick={handleBackToSessions}
                    variant='outlined'
                    sx={{ alignSelf: 'stretch' }}
                >Session 1 pair 2025</Button>
            </Tooltip>

            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, minWidth: '30vw', borderColor: '#c4c4c4' }} variant='outlined'>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Rechercher une épreuve, une date, une salle..."
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <Tooltip title="Voir toutes les épreuves">
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <FormatListBulleted />
                    </IconButton>
                </Tooltip>
            </Paper>


        </Stack >

    );
} export default SearchBar;