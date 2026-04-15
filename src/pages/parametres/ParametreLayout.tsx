import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";

type ParametreLayoutProps = {
    titre: string;
    sousTitre: string;
    children?: React.ReactNode;
};


export default function ParametreLayout({ titre, sousTitre, children }: ParametreLayoutProps) {
    return (
        <>
            <Stack direction="column" spacing={2} margin={4}>
                <Stack flexDirection={'column'} alignItems="start">
                        <Typography variant="h5" fontWeight="bold">
                            {titre}
                        </Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary} mt={1}>
                            {sousTitre}
                        </Typography>
                    </Stack>
                {children}
            </Stack>
        </>
    )
}