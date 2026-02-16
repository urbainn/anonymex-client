import { colors, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Check } from "@mui/icons-material";

interface SelectionProps {
    titre: string;
    sousTitre: string;
    termine: boolean;
    color: string;
    handleClick: () => void;
}

export default function Selection (props: SelectionProps) {




    return (

     <Stack width={400  } direction="row" alignItems={"center"} justifyContent="space-between" bgcolor={alpha(props.color, 0.05)} padding={1} borderRadius={2}
      sx={{ '&:hover': { bgcolor: alpha(props.color, 0.1), cursor: 'pointer' }, transition: 'background-color 0.2s' }} onClick={props.handleClick}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack alignItems={"center"} p={1} width={50} height={50} justifyContent={"center"} borderRadius={1} bgcolor={props.termine ? props.color : alpha(props.color, 0.4)}>
                    {props.termine && <Check sx={{ color: colors.grey[700] }} />}
                </Stack>
                <Stack>
                    <Typography fontWeight={500}> {props.titre} </Typography>
                    <Typography sx={{ color: colors.grey[600] }}> {props.sousTitre} </Typography>
                </Stack>
            </Stack>
        </Stack>
        );
}