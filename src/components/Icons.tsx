import type { JSX } from "@emotion/react/jsx-runtime";
import { Icon, Stack } from "@mui/material";


const colorIcons = "grey.800";

function Icons(props: { icon: JSX.Element, bgcolor?: string, sx?: object }) {
    return (
        <Stack direction="row" sx={{ bgcolor: props.bgcolor + '4F', borderRadius: 5, padding: 1 }}>
            <Icon sx={{ color: colorIcons, ...props.sx }}>
                {props.icon}
            </Icon>
        </Stack>
    );
}

export default Icons;
