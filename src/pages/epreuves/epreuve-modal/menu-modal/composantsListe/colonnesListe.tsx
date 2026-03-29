
import { type GridColDef } from '@mui/x-data-grid';
import type { APIConvocation } from '../../../../../contracts/convocations';


export const getColumns = (noteModifiable: boolean, hovered: string | null): GridColDef<APIConvocation>[] => [
    {
        field: 'codeEpreuve',
        headerName: 'Code Épreuve',
        width: 200,
        hideable: false,
        editable: false,
    },
    {
        field: 'codeAnonymat',
        headerName: 'Code Anonymat',
        width: 200,
        editable: false,
        hideable: false,
    },
    {
        field: 'codeSalle',
        headerName: 'Code Salle',
        width: 200,
        editable: false,
        hideable: false,
    },
    {
        field: 'numeroEtudiant',
        headerName: 'Numéro Étudiant',
        width: 200,
        editable: false,
        hideable: false,
    },
    {
        field: 'rang',
        headerName: 'Rang',
        type: 'number',
        width: 100,
        editable: true,
        hideable: false,
    },
    {
        field: 'noteQuart',
        headerName: 'Note',
        type: 'number',
        width: 100,
        editable: true,
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
