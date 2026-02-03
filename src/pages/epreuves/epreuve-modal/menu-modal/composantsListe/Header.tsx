import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey, red } from '@mui/material/colors';
import { Delete, Height, Sort } from '@mui/icons-material';
import { Box, colors, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Switch, Toolbar, Typography } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Visibility from '@mui/icons-material/Visibility';
import { GridToolbarDivider } from '@mui/x-data-grid/internals';
import {
    QuickFilter,
    QuickFilterControl,
    FilterPanelTrigger,
    ToolbarButton
} from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';

import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Tooltip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

interface StudentRow {
    numEtu: number;
    nom: string;
    prenom: string;
    salle: string;
    codeAnonymat: string;
    Note: number;
}

interface HeaderProps {
    selectedRows: StudentRow[];
    handleDelete: (listeNumEtu: number[]) => void;
    handleTransfer: (listeNumEtu: number[], salle: string) => void;
    handleConvocations: (listeNumEtu: number[]) => void;
    setSalleFilter: (salle: string) => void;
    salleFilter: string;
    sallesUniques: string[];

}


export default function Header(props: HeaderProps) {


    const inputRef = useRef<HTMLInputElement>(null);

    return (

        <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: `1px solid ${grey[300]}`, width: '100%' }}>

            <Box
                sx={{
                    ml: 1,
                    direction: 'row',
                    alignItems: 'center',
                    display: 'flex',
                    maxWidth: 150,
                    '& input': {
                        padding: 1,
                        backgroundColor: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        borderColor: 'grey.500',
                    },

                }}
            >
                <IconButton onClick={() => inputRef.current?.focus()} size="small">
                    <SearchIcon sx={{ color: 'grey.500' }} />
                </IconButton>
                <QuickFilter >
                    <QuickFilterControl inputRef={inputRef} placeholder="Rechercher..." />
                </QuickFilter>
            </Box>


            <GridToolbarDivider />

            <Typography variant="subtitle1" sx={{ width: 200, mx: 2, color: props.selectedRows.length > 0 ? colors.grey[700] : colors.grey[500] }}>
                Selection {'('}{props.selectedRows.length} étudiant{props.selectedRows.length > 1 ? 's' : ''}{')'}
            </Typography>

            <GridToolbarDivider />



            <Tooltip title="Supprimer les étudiants sélectionnés">
                <Button
                    disabled={props.selectedRows.length === 0}
                    onClick={() => props.handleDelete(props.selectedRows.map(row => row.numEtu))}
                    sx={{ height: 32, color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <Delete />

                </Button>
            </Tooltip>
            <GridToolbarDivider />
            <Tooltip title="Transférer les étudiants dans une salle">
                <Button
                    disabled={props.selectedRows.length === 0}
                    onClick={() => props.handleTransfer(props.selectedRows.map(row => row.numEtu), "EXSALLE")}
                    sx={{ height: 32, color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <SyncAltIcon />
                </Button>
            </Tooltip>
            <GridToolbarDivider />
            <Tooltip title="Voir la convocation d'un étudiant">
                <Button
                    disabled={props.selectedRows.length !== 1}
                    onClick={() => props.handleConvocations(props.selectedRows.map(row => row.numEtu))}
                    sx={{ height: 32, color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <Visibility />
                </Button>
            </Tooltip>

            <GridToolbarDivider />

            <Tooltip title="Filtrer les colonnes">
                <Button sx={{ height: 32, color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <FilterPanelTrigger render={<SortIcon />}>
                        <FilterListIcon fontSize="small" />
                    </FilterPanelTrigger>
                </Button>
            </Tooltip>


            <GridToolbarDivider />

            <Box sx={{ flexGrow: 1 }} />

            <Select
                id="salle-select"
                value={props.salleFilter}
                onChange={(event) => { props.setSalleFilter(event.target.value); console.log(event.target.value); }}
                sx={{
                    height: 32, width: 175, mx: 2, backgroundColor: 'grey.100', borderRadius: 2,
                    '& input': {
                        padding: 1,
                        backgroundColor: 'grey.500',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        borderColor: 'grey.700',
                    },
                }}
            >
                <MenuItem sx={{ color: grey[800] }} value="x">Toutes les salles</MenuItem>
                {props.sallesUniques.map((salle) => (
                    <MenuItem sx={{ color: grey[800] }} key={salle} value={salle}>{salle}</MenuItem>
                ))}
            </Select>





        </Box>

    );
}