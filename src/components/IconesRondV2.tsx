import React, { cloneElement } from "react";
import { Box, colors, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tooltip from '@mui/material/Tooltip';


import type { SvgIconProps } from "@mui/material/SvgIcon";

interface IconRondV2Props {
    children: React.ReactElement<SvgIconProps>;
    onClick?: () => void;
    color?: string;
    hoverColor?: string;
    sx?: object;
    tooltip?: string;
    text?: string;
}

function IconRondV2(props: IconRondV2Props) {

    return (

        <Tooltip title={props.tooltip ?? ""} arrow>
            <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    bgcolor: props.color ?? colors.blue[100],
                    borderRadius: 100,
                    padding: 0.75,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: props.hoverColor ?? colors.blue[200] },
                    transition: 'background-color 0.2s',
                    ...props.sx
                }}

                onClick={props.onClick}

            >
                <Box display="flex" fontSize="small" sx={{ color: "grey.800" }} >
                    {cloneElement(props.children, { fontSize: "small" })} <Typography>{props.text}</Typography>
                </Box>
            </Stack >
        </Tooltip>
    );
}

export default IconRondV2;