import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, type JSX } from 'react';
import { frFR } from '@mui/x-data-grid/locales';

import { getColumns } from './composantsListe/colonnesListe';
import { FormControl, InputLabel, MenuItem, Select, Snackbar, Stack } from '@mui/material';

import { useConfirm } from './composantsListe/useConfirm';
import IconesRondV2 from '../../../../components/IconesRondV2';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '@mui/material';
import React from 'react';
import { useGridApiRef } from '@mui/x-data-grid';

interface StudentRow {
    numEtu: number;
    nom: string;
    prenom: string;
    salle: string;
    codeAnonymat: string;
    Note: number;
}





function MenuListeEtudiants() {

    const [noteModifiable, setNoteModifiable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [salleFilter, setSalleFilter] = useState<string>("x");
    const [hovered, setHovered] = useState<string | null>(null);

    const [selectedRows, setSelectedRows] = useState<StudentRow[]>([]);

    const columns = getColumns(noteModifiable, hovered);

    const { confirm, confirmDialog } = useConfirm();

    const [rows, setRows] = useState<StudentRow[]>([
        { numEtu: 12552, nom: "Dupont", prenom: "Jean", salle: "K111", codeAnonymat: "E12345", Note: 12 },
        { numEtu: 23456, nom: "Martin", prenom: "Marie", salle: "K111", codeAnonymat: "E67890", Note: 15 },
        { numEtu: 34567, nom: "Durand", prenom: "Paul", salle: "D404", codeAnonymat: "E54321", Note: 9 },
        { numEtu: 45678, nom: "Lefevre", prenom: "Sophie", salle: "D404", codeAnonymat: "E09876", Note: 14 },
        { numEtu: 56789, nom: "Moreau", prenom: "Luc", salle: "E505", codeAnonymat: "E11223", Note: 11 },
        { numEtu: 67890, nom: "Simon", prenom: "Emma", salle: "E505", codeAnonymat: "E44556", Note: 13 },
        { numEtu: 78901, nom: "Bernard", prenom: "Lucas", salle: "K111", codeAnonymat: "E77889", Note: 10 },
        { numEtu: 89012, nom: "Thomas", prenom: "Chloé", salle: "K111", codeAnonymat: "E99001", Note: 16 },
        { numEtu: 90123, nom: "Robert", prenom: "Hugo", salle: "D404", codeAnonymat: "E22334", Note: 8 },
        { numEtu: 11234, nom: "Richard", prenom: "Léa", salle: "D404", codeAnonymat: "E55667", Note: 17 },
        { numEtu: 12345, nom: "Petit", prenom: "Nathan", salle: "K111", codeAnonymat: "E88990", Note: 7 },
    ]
    );

    const handleSaveRows = async (newRow: StudentRow, oldRows: StudentRow, params: any): Promise<StudentRow> => {
        const result = await confirm(oldRows, newRow);

        if (result) {

            setRows((rows) => rows.map((row) => (row.numEtu === result.numEtu ? result : row)));
        }

        return result;
    }


    const memeDico = (a: StudentRow, b: StudentRow): boolean => {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        }

        return keysA.every((key) => a[key as keyof StudentRow] === b[key as keyof StudentRow]);
    }

    const sallesUniques = Array.from(new Set(rows.map(row => row.salle)));


    const apiRef = useGridApiRef();

    return (
        <>

            {confirmDialog}
            <Box sx={{ height: 400 }}>

                <DataGrid
                    apiRef={apiRef}
                    sx={{ height: 400 }}
                    getRowId={(row) => row.numEtu}
                    loading={loading}
                    density='compact'
                    rows={salleFilter === "x" ? rows : rows.filter(row => row.salle === salleFilter)}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    processRowUpdate={(newRow, oldRow, params) =>
                        !memeDico(oldRow, newRow)
                            ? handleSaveRows(newRow, oldRow, params)
                            : oldRow
                    }
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    disableColumnSelector
                    onCellDoubleClick={(params) => {
                        if (!params.colDef.editable) {
                            // setTooltipOpen(true);
                        }
                    }}

                    onRowSelectionModelChange={() => {
                        const selectedRowsMap = apiRef!.current!.getSelectedRows();;
                        const selectedRowsData = Array.from(selectedRowsMap.values());
                        setSelectedRows(selectedRowsData as StudentRow[]);
                        console.log("Toutes les lignes sélectionnées :", selectedRowsData);
                    }}


                />

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 2 }}>
                    <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
                        <InputLabel >Salle</InputLabel>
                        <Select
                            id="salle-select"
                            value={salleFilter}
                            label="Salle"
                            onChange={(event) => { setSalleFilter(event.target.value); console.log(event.target.value); }}
                        >
                            <MenuItem value="x">Toutes les salles</MenuItem>
                            {sallesUniques.map((salle) => (
                                <MenuItem key={salle} value={salle}>{salle}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {selectedRows.length > 0 ? (
                        <IconesRondV2 tooltip='supprimer' onClick={() => console.log("test")}>
                            <DeleteIcon sx={{ color: colors.grey[700] }} fontSize="medium" />
                        </IconesRondV2>)
                        : null
                    }





                    <Snackbar
                        open={tooltipOpen}
                        autoHideDuration={2000}
                        message="Cette cellule n'est pas modifiable"
                        onClose={() => setTooltipOpen(false)}
                    />

                </Stack>


            </Box>


        </>
    );
}

export default MenuListeEtudiants;