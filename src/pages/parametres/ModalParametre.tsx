import React from "react";
import { Modal } from "../../components/Modal";
import { Alert, Snackbar, Stack, Tab, Tabs } from "@mui/material";
import { updateUtilisateur } from "../../contracts/utilisateurs";
import PageParametreBordereaux from "./PageParametreBordereaux";
import PageParametreSauvegarde from "./PageParametreSauvegarde";
import PageParametreProfil from "./PageParametreProfil";

type ModalParametreProps = {
    onClose: () => void;
}

export default function ModalParametre({ onClose }: ModalParametreProps) {

    const handlers = [
        handleProfil,
        handleBordereaux,
        handleSauvegarde
    ];

    // Paramètres généraux
    const [prenom, setPrenom] = React.useState("");
    const [nom, setNom] = React.useState("");

    // Erreur
    const [error, setError] = React.useState<string | null>(null);

    // Paramètres de sauvegarde
    const [chemin, setChemin] = React.useState("");
    const [apiKey, setApiKey] = React.useState("");

    // Paramètres des bordereaux
    const [logoFac, setLogoFac] = React.useState<File | null>(null);
    const [logoUniv, setLogoUniv] = React.useState<File | null>(null);

    // Snackbar de succès
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    // Onglet sélectionné
    const [tabSelectionnee, setTabSelectionnee] = React.useState(0);

    function handleChangeTab(_: React.SyntheticEvent<Element, Event>, newValue: number) {
        setTabSelectionnee(newValue);
        setError(null);
        setSuccessMessage(null);
    }

    async function handleModifications(index: number) {
        setError(null);

        try {
            await handlers[index]();
        } catch {
            setError("Une erreur est survenue");
        }
    }

    async function handleProfil() {
        if (!prenom && !nom) {
            setError("Veuillez remplir au moins un des champs.");
            return;
        }

        const donnees: { prenom?: string; nom?: string } = {};

        if (prenom) donnees.prenom = prenom;
        if (nom) donnees.nom = nom;

        const response = await updateUtilisateur(0, donnees);

        if (response.status !== 200) {
            setError(response.error || "Erreur inconnue");
            return;
        }

        setSuccessMessage("Paramètres mis à jour avec succès");
    }

    async function handleBordereaux() {
        if (!logoFac && !logoUniv) {
            setError("Veuillez sélectionner au moins un logo à mettre à jour.");
            return;
        }

        // TODO: appel API
        setSuccessMessage("Logos mis à jour avec succès");
    }

    async function handleSauvegarde() {
        if (!chemin && !apiKey) {
            setError("Veuillez remplir au moins un des champs.");
            return;
        }

        // TODO: appel API
        setSuccessMessage("Paramètres de sauvegarde mis à jour avec succès");
    }

    return (
        <>
           <Modal titre={"Paramètres"} onClose={onClose} width="900px">
                <Stack direction="row" width="100%">

                    {/* Menu de navigation entre les sections de paramètres */}
                    <Stack
                        sx={{
                            minWidth: "200px",
                            borderRight: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            value={tabSelectionnee}
                            onChange={handleChangeTab}
                            sx={{
                                "& .MuiTabs-indicator": {
                                    left: 0,
                                    width: "4px",
                                },
                            }}
                        >
                            {[
                                { label: "Compte / Profil" },
                                { label: "Bordereaux"},
                                { label: "Sauvegarde"},
                            ].map((tab, _) => (
                                <Tab
                                    key={tab.label}
                                    label={tab.label}
                                    sx={{
                                        alignItems: "center",
                                        textTransform: "none",
                                        px: 2,
                                        py: 1,
                                        minHeight: 48,

                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },

                                        "&.Mui-selected": {
                                            backgroundColor: "action.selected",
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Stack>

                    {/* Contenu de l'onglet sélectionné */}
                    <Stack width={"100%"}>
                        {tabSelectionnee === 0 && (
                            <PageParametreProfil 
                                setNom={setNom} 
                                setPrenom={setPrenom} 
                                onSauvegarder={() => handleModifications(0)} 
                                prenom={prenom} 
                                nom={nom}
                            />
                        )}

                        {tabSelectionnee === 1 && (
                            <PageParametreBordereaux 
                                logoFac={logoFac}
                                logoUniv={logoUniv} 
                                setLogoFac={setLogoFac} 
                                setLogoUniv={setLogoUniv}
                                onSubmit={() => handleModifications(1)}
                            />
                        )}

                        {tabSelectionnee === 2 && (
                            <PageParametreSauvegarde 
                                setChemin={setChemin} 
                                setApiKey={setApiKey} 
                                chemin={chemin} 
                                apiKey={apiKey} 
                                onSubmit={() => handleModifications(2)}
                            />
                        )}
                    </Stack>
                </Stack>

           </Modal>

           {error && (
                <Snackbar
                    open={!!error}
                    message={error}
                    onClose={() => setError(null)}
                    autoHideDuration={6000}
                >
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
           )}

            {successMessage && (
                <Snackbar
                    open={!!successMessage}
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                    autoHideDuration={6000}
                >
                    <Alert severity="success">{successMessage}</Alert>
                </Snackbar>
            )}
        </>
    )
}