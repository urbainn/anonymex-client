import { useState } from "react";
import ComposantSessionVide from "./ComposantSessionVide";
import ComposantSessionPleine from "./ComposantSessionPleine";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import theme from "../../theme/theme";
import LinkIcon from '@mui/icons-material/Link';
import { SessionsStatusNom } from "../../contracts/sessions";

export default function PageInscription() {
    const [etape, setEtape] = useState<"sessionVide" | "sessionRempli" | null>(null);

    let listeSession = [
        {date: "2023", titre: "Session 1 Pair", status: SessionsStatusNom[1] },
        {date: "2022", titre: "Session 2 Impair", status: SessionsStatusNom[2] },
        {date: "2022", titre: "Session 3 Pair", status: SessionsStatusNom[3] },
    ]; // Ceci est un exemple

    if (listeSession.length === 0 && etape === null) {
        setEtape("sessionVide");
    } else if (listeSession.length > 0 && etape === null) {
        setEtape("sessionRempli");
    }

    return (
        <>
            <Stack flexDirection={'column'} margin={4}>
                <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems="center" >
                    <Stack flexDirection={'column'} alignItems="baseline">
                        <Typography variant="h4" color='#00000060'>
                            Accueil
                        </Typography>
                        <Typography variant="h3" color={theme.palette.text.primary} fontWeight="bold">
                            Anonymex
                        </Typography>
                    </Stack>

                    <Stack gap={4} flexDirection={'row'} alignSelf="flex-start">
                        <Button variant="contained" disabled color="primary" startIcon={<LinkIcon />} sx={{borderRadius: '20px', textTransform: 'none'}}>
                            Inviter un utilisateur
                        </Button>
                        <Avatar sx={{bgcolor: theme.palette.primary.main}}>CC</Avatar>
                    </Stack>
                </Stack>

                <Stack flexDirection={'column'} marginTop={20} width={'100%'}>
                    {/* Session vide */ etape === "sessionVide" ? <ComposantSessionVide /> : null}
                    {/* Session rempli */ etape === "sessionRempli" ? <ComposantSessionPleine listeSessions={listeSession} /> : null}
                </Stack>
            </Stack>
        </>
    );
}