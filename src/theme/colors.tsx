// src/theme/palette.ts
import { deepPurple, amber, grey, pink, teal, purple, cyan, red } from '@mui/material/colors';

export const appColors = {
    primary: {
        main: deepPurple[500],
        light: deepPurple[300],
        dark: deepPurple[700],
    },
    background: {
        default: '#ffffffff',
    },
    paper: {
        default: purple[50],
        hovered: purple[100],
    },
    button: {
        default: grey[100],
        hover: deepPurple[50],
        active: deepPurple[100],
    },
    importantButton: {
        default: deepPurple[200],
        hover: deepPurple[300],
        active: deepPurple[400],
    },
    border: {
        default: grey[400],
    },
    status: {
        materielNonImprime: grey[500],
        materielImprime: deepPurple[500],
        attenteDepot: amber[500],
        depotComplet: pink[500],
        notesExportees: teal[500],
        incidents: red[500],
    },
    examens: {
        futurs: cyan[200],
        passes: deepPurple[200],
    },
};

export type AppColors = typeof appColors;
export default appColors;