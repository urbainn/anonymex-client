import { indigo, grey, purple, deepPurple, cyan, amber, pink, teal, red, blue} from '@mui/material/colors';

export const appColors = {
    primary: {
        main: indigo[500],
        light: indigo[300],
        dark: indigo[700],
    },
    background: {
        default: blue['A400'],
    },
    text: {
        primary: grey[900],
        secondary: grey[600],
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