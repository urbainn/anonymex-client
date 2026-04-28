import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import ParametreLayout from "./ParametreLayout";
import { SessionModalBouton } from "../accueil/sessions/session-modal/composantsFormulaireSession";

type PageParametreBordereauxProps = {
    logoFac: File | null;
    logoUniv: File | null;
    setLogoFac: (logo: File | null) => void;
    setLogoUniv: (logo: File | null) => void;
    onSubmit: () => void;
}


export default function PageParametreBordereaux({logoFac, logoUniv, setLogoFac, setLogoUniv, onSubmit }: PageParametreBordereauxProps) {
    
    return (
        <>
           <ParametreLayout
                titre={"Paramètres de configuration"}
                sousTitre={"Gérer les paramètres de configuration de l'application"}
            >
                <Stack spacing={2} width="100%">

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
                                1. Bordereaux
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Configurez les images affichées sur les bordereaux (logo faculté et université).
                            </Typography>

                            {/* Logo faculté */}
                            <Stack spacing={2}>
                                <Typography variant="subtitle2">
                                    Logo faculté
                                </Typography>

                                {logoFac ? (
                                    <Alert severity="info">
                                        Un logo est actuellement sélectionné : {logoFac.name}
                                    </Alert>
                                ) : (
                                    <Alert severity="warning">
                                        Aucun logo faculté sélectionné.
                                    </Alert>
                                )}

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button component="label" variant='contained'>
                                        Choisir un fichier
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files.length > 0) {
                                                    setLogoFac(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </Button>

                                    <SessionModalBouton
                                        label="Réinitialiser"
                                        color="error"
                                        onClick={() => setLogoFac(null)}
                                    />
                                </Stack>
                                
                            </Stack>

                            {/* Logo université */}
                            <Stack spacing={2}>
                                <Typography variant="subtitle2">
                                    Logo université
                                </Typography>

                                {logoUniv ? (
                                    <Alert severity="info">
                                        Un logo est actuellement sélectionné : {logoUniv.name}
                                    </Alert>
                                ) : (
                                    <Alert severity="warning">
                                        Aucun logo université sélectionné.
                                    </Alert>
                                )}

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button component="label" variant='contained'>
                                        Choisir un fichier
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files.length > 0) {
                                                    setLogoUniv(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </Button>

                                    <SessionModalBouton
                                        label="Réinitialiser"
                                        color="error"
                                        onClick={() => setLogoUniv(null)}
                                    />
                                </Stack>
                            </Stack>

                        </Stack>
                    </Box>

                    <SessionModalBouton
                        label="Sauvegarder les modifications"
                        onClick={onSubmit}
                    />

                </Stack>
            </ParametreLayout>
        </>
    )
}