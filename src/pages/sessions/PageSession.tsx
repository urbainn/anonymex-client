import { useState, useEffect } from "react";
import ComposantSessionVide from "./ComposantSessionVide";
import ComposantSessionPleine from "./ComposantSessionPleine";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import theme from "../../theme/theme";
import LinkIcon from '@mui/icons-material/Link';
import { getSessions } from "../../contracts/sessions";

export default function PageSession() {
    const [etape, setEtape] = useState<"sessionVide" | "sessionRempli" | null>(null);
    const [listeSession, setListeSession] = useState<Array<{annee: number; id: number; nom: string; statut: 1 | 2 | 3 | 4}>>([]);

    useEffect(() => {
        async function fetchSessions() {
            const response = await getSessions();
            if (response.status !== 200 || !response.data) {
                console.error("Erreur :", response.error || "Inconnue");
                return;
            }

            const sessions = response.data.sessions;
            setListeSession(sessions);
            setEtape(sessions.length === 0 ? "sessionVide" : "sessionRempli");
        }

        fetchSessions();
    }, []);

    console.log("sessions :", listeSession);

    return (
        <Stack flexDirection={'column'} margin={4}>
            
            <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems="center">
                <Stack flexDirection={'column'} alignItems="baseline">
                    <Typography variant="h4" color='#00000060'>Accueil</Typography>
                    <Typography variant="h3" color={theme.palette.text.primary} fontWeight="bold">
                        Anonymex
                    </Typography>
                </Stack>

                <Stack gap={4} flexDirection={'row'} alignSelf="flex-start">
                    <Button 
                        variant="contained"
                        disabled
                        color="primary"
                        startIcon={<LinkIcon />}
                        sx={{ borderRadius: '20px', textTransform: 'none' }}
                    >
                        Inviter un utilisateur
                    </Button>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>CC</Avatar>
                </Stack>
            </Stack>

            <Stack flexDirection={'column'} marginTop={20} width={'100%'}>
                {etape === "sessionVide" && <ComposantSessionVide />}
                {etape === "sessionRempli" && <ComposantSessionPleine listeSessions={listeSession} />}
            </Stack>

        </Stack>
    );
}