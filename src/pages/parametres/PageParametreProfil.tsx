import { Box, Stack, Typography } from "@mui/material";
import ParametreLayout from "./ParametreLayout";
import { SessionChampTexte, SessionModalBouton } from "../accueil/sessions/session-modal/composantsFormulaireSession";

type PageParametreGlobauxProps = {
    prenom: string;
    nom: string;
    setPrenom: (prenom: string) => void;
    setNom: (nom: string) => void;
    onSauvegarder: () => void;
}

export default function PageParametreGlobaux({ prenom, nom, setPrenom, setNom, onSauvegarder}: PageParametreGlobauxProps) {
    return (
        <>
            <ParametreLayout 
                titre={"Paramètres du profil"} 
                sousTitre={"Gérer les paramètres du profil de l'application"}
            >
                <Stack spacing={2} width="100%">

                    {/* Informations personnelles */}
                    <Box
                        sx={{
                            p: 3,
                            width: "100%",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">
                                1. Informations personnelles
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Modifiez vos informations personnelles utilisées dans l'application.
                            </Typography>

                            <SessionChampTexte
                                label="Prénom"
                                name="prenom"
                                onChange={setPrenom}
                                value={prenom}
                            />

                            <SessionChampTexte
                                label="Nom"
                                name="nom"
                                onChange={setNom}
                                value={nom}
                            />
                        </Stack>
                    </Box>

                    <SessionModalBouton label={"Sauvegarder"} onClick={onSauvegarder}/>

                </Stack>
            </ParametreLayout>
        </>
    )
}