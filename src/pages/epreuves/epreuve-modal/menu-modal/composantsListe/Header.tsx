import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Delete } from '@mui/icons-material';
import { Box, colors, IconButton, MenuItem, Select, Typography } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Visibility from '@mui/icons-material/Visibility';
import { GridToolbarDivider } from '@mui/x-data-grid/internals';
import {
    QuickFilter,
    QuickFilterControl,
    FilterPanelTrigger,
} from '@mui/x-data-grid';

import FilterListIcon from '@mui/icons-material/FilterList';


import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import type { GridToolbarProps } from '@mui/x-data-grid';
import type { APIConvocation } from '../../../../../contracts/convocations';
import DialogRechercheSalle from './DialogRechercheSalle';

export interface HeaderProps {
    selectedRows: APIConvocation[];
    handleDelete: (listeNumEtu: string[]) => void;
    handleTransfer: (listeNumEtu: string[], salle: string) => void;
    handleConvocations: (listeNumEtu: string[]) => void;
    setSalleFilter: (salle: string) => void;
    salleFilter: string;
    sallesUniques: string[];
}

type Props = GridToolbarProps & HeaderProps;

export default function Header(props: Props) {

    const [openSelect, SetOpenSelect] = useState(false);
    const [openDialog, SetOpenDialog] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);


    const handleAjoutSalle = () => {
        SetOpenDialog(true);
    }

    return (

        <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: `1px solid ${grey[300]}`, width: '100%' }}>
            <DialogRechercheSalle
                open={openDialog}
                onClose={() => SetOpenDialog(false)}
                onSelectSalle={(salle) => {
                    props.handleTransfer(props.selectedRows.map(row => row.codeAnonymat!), salle);
                }}
            />
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
                    onClick={() => props.handleDelete(props.selectedRows.map(row => row.codeAnonymat!))}
                    sx={{ height: 32, color: grey[700], borderColor: grey[400], ':hover': { backgroundColor: grey[300], borderColor: grey[400] } }}>
                    <Delete />

                </Button>
            </Tooltip>
            <GridToolbarDivider />

            <Select
                id="transfer-salle-select"
                open={openSelect}
                value=""
                displayEmpty
                onClose={() => SetOpenSelect(false)}
                onOpen={() => SetOpenSelect(true)}
                disabled={props.selectedRows.length === 0}
                renderValue={() => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SyncAltIcon fontSize="small" />
                    </Box>
                )}
                sx={{
                    height: 30,
                    width: 70,
                    color: grey[700],
                    borderColor: grey[400],
                    '& input': {
                        padding: 1,
                        backgroundColor: 'white',
                    },
                    '& input:focus': {
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
                {props.sallesUniques.map((salle) => (
                    <MenuItem
                        key={salle}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'white',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: 'grey.100 !important',
                            }
                        }}
                        onClick={() => {
                            props.handleTransfer(props.selectedRows.map(row => row.codeAnonymat!), salle);
                            SetOpenSelect(false);
                        }} >
                        {salle}
                    </MenuItem>
                ))}
                <MenuItem
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: 'white',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: 'grey.100 !important',
                        }
                    }}
                    onClick={() => {
                        SetOpenSelect(false);
                        handleAjoutSalle();
                    }}>
                    Ajouter une salle
                </MenuItem>
            </Select>


            <GridToolbarDivider />
            <Tooltip title="Voir les feuilles d'identification">
                <Button
                    disabled={props.selectedRows.length === 0}
                    onClick={() => props.handleConvocations(props.selectedRows.map(row => row.codeAnonymat!))}
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