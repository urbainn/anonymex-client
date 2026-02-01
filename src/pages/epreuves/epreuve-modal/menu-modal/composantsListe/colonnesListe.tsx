
import { type GridColDef } from '@mui/x-data-grid';
import IconesRondV2 from '../../../../../components/IconesRondV2';
import { colors } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



interface StudentRow {
    numEtu: number;
    nom: string;
    prenom: string;
    salle: string;
    codeAnonymat: string;
    Note: number;
}

export const getColumns = (noteModifiable: boolean, hovered: string | null): GridColDef<StudentRow>[] => [
    {
        field: 'numEtu',
        headerName: 'Numéro Étudiant',
        width: 150,
        hideable: false,
    },
    {
        field: 'prenom',
        headerName: 'Prénom',
        width: 150,
        editable: true,
        hideable: false,
    },
    {
        field: 'nom',
        headerName: 'Nom',
        width: 150,
        editable: true,
        hideable: false,
    },
    {
        field: 'salle',
        headerName: 'Salle',
        width: 110,
        editable: true,
        hideable: false,
    },
    {
        field: 'codeAnonymat',
        headerName: 'Code Anonymat',
        width: 160,
        editable: true,
        hideable: false,
    },
    {
        field: 'Note',
        headerName: 'Note',
        type: 'number',
        width: 110,
        editable: noteModifiable,
        hideable: false,
    },

    /* 
    {
        field: 'actions',
        type: 'actions',
        width: 60,
        getActions: (params) => {
            console.log("hovered id:", hovered, "params id:", params.id);
            if (hovered === params.id) {

                return [
                    <IconesRondV2 tooltip='supprimer' onClick={() => console.log("test")}>
                        <DeleteIcon sx={{ color: colors.grey[700] }} fontSize="medium" />
                    </IconesRondV2>,
                ];
            }
            return [];
        }
    }
    */
];
