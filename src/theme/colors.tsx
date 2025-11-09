import { indigo, grey, blue } from '@mui/material/colors';

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
};

export type AppColors = typeof appColors;
export default appColors;