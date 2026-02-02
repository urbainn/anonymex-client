import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey, red } from '@mui/material/colors';
import { Delete, Height } from '@mui/icons-material';
import { Box, colors, Grid, IconButton, Switch, Toolbar } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Visibility from '@mui/icons-material/Visibility';
import { GridToolbarDivider } from '@mui/x-data-grid/internals';
import {
    QuickFilter,
    QuickFilterControl,
} from '@mui/x-data-grid';

import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { Tooltip } from '@mui/material';

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
}


export default function Header(props: HeaderProps) {


    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: `1px solid ${grey[300]}`, px: 1 }}>

            <Box
                sx={{
                    direction: 'row',
                    alignItems: 'center',
                    display: 'flex',
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
                    <SearchIcon sx={{ fontSize: 20, color: 'grey.500' }} />
                </IconButton>
                <QuickFilter >
                    <QuickFilterControl inputRef={inputRef} placeholder="Rechercher un étudiant..." />
                </QuickFilter>
            </Box>


            <GridToolbarDivider />


            <Tooltip title="Supprimer les étudiants sélectionnés">
                <Button
                    disabled={props.selectedRows.length === 0}
                    onClick={() => props.handleDelete(props.selectedRows.map(row => row.numEtu))}
                    sx={{ color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <Delete />

                </Button>
            </Tooltip>
            <GridToolbarDivider />
            <Tooltip title="Transférer les étudiants dans une salle">
                <Button
                    disabled={props.selectedRows.length === 0}
                    onClick={() => props.handleTransfer(props.selectedRows.map(row => row.numEtu), "EXSALLE")}
                    sx={{ color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <SyncAltIcon />
                </Button>
            </Tooltip>
            <GridToolbarDivider />
            <Tooltip title="Voir la convocation d'un étudiant">
                <Button
                    disabled={props.selectedRows.length !== 1}
                    onClick={() => props.handleConvocations(props.selectedRows.map(row => row.numEtu))}
                    sx={{ color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <Visibility />
                </Button>
            </Tooltip>



        </Box>
    );
}