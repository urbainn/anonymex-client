import { Typography } from "@mui/material";

export function TypoTitre(props: { children: React.ReactNode, sx?: object }) {
    return (
        <Typography fontWeight={400} variant="h6" color="grey.500" sx={props.sx}>
            {props.children}
        </Typography>
    );
}