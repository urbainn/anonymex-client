import { Box, Stack, TextField, Typography } from "@mui/material";
import ParametreLayout from "./ParametreLayout";
import { SessionChampTexte, SessionModalBouton } from "../accueil/sessions/session-modal/composantsFormulaireSession";

type PageParametreSauvegardeProps = {
    setChemin: (chemin: string) => void;
    setApiKey: (apiKey: string) => void;
    chemin: string;
    apiKey: string;
    onSubmit: () => void;
}

export default function PageParametreSauvegarde({ setChemin, setApiKey, chemin, apiKey, onSubmit }: PageParametreSauvegardeProps) {

    return (
        <>
            <ParametreLayout 
                titre={"Paramètres de sauvegarde"} 
                sousTitre={"Gérer les paramètres de sauvegarde de l'application"}
            >
                <Stack spacing={2} width="100%">

                    {/* Sauvegarde locale */}
                    <Box
                        sx={{
                            p: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">
                                1. Sauvegarde locale
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Définissez le chemin où seront enregistrés les fichiers sur votre machine.
                            </Typography>

                            <TextField
                                label="Chemin de sauvegarde"
                                value={chemin}
                                onChange={(e) => setChemin(e.target.value)}
                                placeholder="Ex: C:\Users\Utilisateur\Sauvegardes"
                            />
                        </Stack>
                    </Box>

                    {/* Sauvegarde cloud */}
                    <Box
                        sx={{
                            p: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">
                                2. Sauvegarde cloud
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Configurez l'accès à un service de stockage en ligne.
                            </Typography>

                            <SessionChampTexte
                                label="Clé API OneDrive"
                                name="apiKey"
                                value={apiKey}
                                onChange={setApiKey}
                            />
                        </Stack>
                    </Box>

                    {/* Bouton global */}
                    <SessionModalBouton 
                        label="Sauvegarder"
                        onClick={onSubmit}
                    />

                </Stack>
            </ParametreLayout>
        </>
    )
}