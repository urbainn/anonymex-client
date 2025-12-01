import { Typography } from "@mui/material";

export function TypoSousTitre(props: { children: React.ReactNode, sx?: object }) {
    return (
        <Typography fontWeight={400} variant="h6" sx={props.sx}>
            {props.children}
        </Typography>
    );
}