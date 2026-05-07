import React from "react";
import { Modal } from "../../components/Modal";
import { Alert, Snackbar, Stack, Tab, Tabs } from "@mui/material";
import SectionParametresCharteGraphique from "./ParametresCharteGraphique";
import SectionParametresSauvegarde from "./ParametresSauvegardes";

type ModalParametreProps = {
    onClose: () => void;
}

export default function ModalParametre({ onClose }: ModalParametreProps) {

    // Erreur
    const [error, setError] = React.useState<string | null>(null);

    // Snackbar de succès
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    // Onglet sélectionné
    const [tabSelectionnee, setTabSelectionnee] = React.useState(0);

    function handleChangeTab(_: React.SyntheticEvent<Element, Event>, newValue: number) {
        setTabSelectionnee(newValue);
        setError(null);
        setSuccessMessage(null);
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
                                { label: "Charte Graphique" },
                                { label: "Sauvegardes" },
                            ].map((tab) => (
                                <Tab
                                    key={tab.label}
                                    label={tab.label}
                                    sx={{
                                        alignItems: "center",
                                        textTransform: "none",
                                        minHeight: 48,
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
                    <Stack width={"100%"} height="600px" padding={3} overflow="auto">
                        {tabSelectionnee === 0 && (
                            <SectionParametresCharteGraphique />
                        )}

                        {tabSelectionnee === 1 && (
                            <SectionParametresSauvegarde />
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