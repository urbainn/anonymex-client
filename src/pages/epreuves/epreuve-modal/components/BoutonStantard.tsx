import { Button, colors } from "@mui/material";
import type { JSX } from "@emotion/react/jsx-runtime";

interface BoutonStandardProps {
    color?: string;
    onClick: () => void;
    icone?: JSX.Element;
    texte: string;
}


export default function BoutonStandard(props: BoutonStandardProps) {

    return (

        <Button onClick={props.onClick} variant="contained" sx={{ bgcolor: props.color + "60", color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none', bgcolor: props.color + "80" }, '&:focus': { boxShadow: 'none' } }} startIcon={props.icone}>
            {props.texte}
        </Button>
    );

}
