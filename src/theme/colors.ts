import { indigo, grey, blue } from '@mui/material/colors';

export const appColors = {
    primary: {
        main: blue[500],
        light: blue[300],
        dark: blue[700],
    },
    background: {
        default: "#ffffff",
    },
    text: {
        primary: grey[900],
        secondary: grey[600],
    },
    border: {
        default: grey[400],
    },
};

export type AppColors = typeof appColors;
export default appColors;