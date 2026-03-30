
import { type GridColDef } from '@mui/x-data-grid';
import type { APIConvocation } from '../../../../../contracts/convocations';



export const getColumns = (noteModifiable: boolean, hovered: string | null): GridColDef<APIConvocation>[] => [


    {
        field: 'codeSalle',
        headerName: 'Code Salle',
        editable: false,
        hideable: false,
        width: 150,
    },
    {
        field: 'codeAnonymat',
        headerName: 'Code Anonymat',
        editable: false,
        hideable: false,
        width: 150,
    },
    {
        field: 'numeroEtudiant',
        headerName: 'Numéro Étudiant',
        editable: false,
        hideable: false,
        width: 150,
    },
    {
        field: 'nom',
        headerName: 'Nom',
        editable: false,
        hideable: false,
        width: 150,
    },
    {
        field: 'prenom',
        headerName: 'Prénom',
        editable: false,
        hideable: false,
        width: 150,
    },

    {
        field: 'rang',
        headerName: 'Rang',
        type: 'number',
        editable: true,
        hideable: false,
        width: 100,
    },
    {
        field: 'noteQuart',
        headerName: 'Note',
        type: 'number',
        editable: true,
        hideable: false,
        width: 100,

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
