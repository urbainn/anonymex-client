import { Button, colors } from "@mui/material";
import type { JSX } from "@emotion/react/jsx-runtime";

interface BoutonStandardProps {
    color?: string;
    onClick?: () => void;
    onClickParam?: (event: React.MouseEvent<HTMLElement>) => void;
    icone?: JSX.Element;
    texte?: string;
    height?: number;
    width?: number | string;
    loading?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;

}


export default function BoutonStandard(props: BoutonStandardProps) {

    return (

        <Button
            loading={props.loading}
            disabled={props.disabled}
            onClick={props.onClick || props.onClickParam}
            variant="contained"
            sx={{
                height: props.height,
                width: props.width,
                bgcolor: props.color + "60",
                color: colors.grey[900],
                py: 1,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                    bgcolor: props.color + "80"
                },
                '&:focus': { boxShadow: 'none' }
            }}
            startIcon={props.icone}>
            {props.texte}
            {props.children}

        </Button>
    );

}
