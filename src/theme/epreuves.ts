import { amber, cyan, deepPurple, grey, pink, red, teal } from '@mui/material/colors';

export const themeEpreuves = {
    status: {
        1: grey[500],
        2: deepPurple[500],
        3: amber[500],
        4: pink[500],
        5: teal[500], // note: incidents n'est pas un statut!
    },
    examens: {
        futurs: cyan[200],
        passes: deepPurple[200],
    },
}