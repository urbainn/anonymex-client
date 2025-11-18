import type { JSX } from "@emotion/react/jsx-runtime";
import { Icon, Stack } from "@mui/material";


function IconeRond(props: { icon: JSX.Element, bgcolor?: string, sx?: object }) {
    return (
        <Stack direction="row" sx={{ bgcolor: props.bgcolor, borderRadius: 5, padding: 1 }}>
            <Icon sx={{ color: "grey.700", ...props.sx }}>
                {props.icon}
            </Icon>
        </Stack>
    );
}

export default IconeRond;
