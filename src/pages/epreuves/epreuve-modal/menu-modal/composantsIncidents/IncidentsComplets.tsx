import { Stack, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import IncidentListe from "./IncidentListe";
import IncidentDetail from "./IncidentDetail";
import { useState, useEffect } from "react";

import type { APIIncident } from '../../../../../contracts/incidents';
import { getIncidents, deleteIncident } from "../../../../../contracts/incidents";

interface IncidentsCompletsProps {
    idSession: number;
    epreuveCode: string;
    onIncidentCreated?: () => void;
    onIncidentResolved?: () => void;
}

export function IncidentsComplets({ idSession, epreuveCode, onIncidentCreated, onIncidentResolved }: IncidentsCompletsProps) {

    const [allIncidents, setAllIncidents] = useState<APIIncident[]>([]);
    const [selectedIncident, setSelectedIncident] = useState<APIIncident | null>(null);
    const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(null);

    const [ouvertSucces, setOuvertSucces] = useState(false);
    const [ouvertEchec, setOuvertEchec] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [incidentASupprimer, setIncidentASupprimer] = useState<APIIncident | null>(null);

    useEffect(() => {
        const getAllIncidents = async () => {
            try {
                const response = await getIncidents(idSession, epreuveCode);
                console.log("Incidents récupérés :", response);
                if (response.data?.incidents) {
                    setAllIncidents(response.data.incidents);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des incidents :", error);
            }
        };

        getAllIncidents();
    }, [idSession, epreuveCode]);

    const handleClickIncident = (incident: APIIncident) => {
        setSelectedIncident(incident);
        setSelectedIncidentId(incident.idIncident);
    }


    const ajouterIncident = (incident: APIIncident) => {
        setAllIncidents((prev) => {
            if (prev.some((item) => item.idIncident === incident.idIncident)) {
                return prev;
            }

            onIncidentCreated?.();
            return [...prev, incident];
        });
    }

    const retirerIncident = (idIncident: number) => {
        setAllIncidents((prev) => {
            const next = prev.filter(incident => incident.idIncident !== idIncident);
            if (next.length < prev.length) {
                onIncidentResolved?.();
            }
            return next;
        });
    }

    const handleOuvrirConfirmation = (incident: APIIncident) => {
        setIncidentASupprimer(incident);
    };

    const handleFermerConfirmation = () => {
        setIncidentASupprimer(null);
    };

    const handleConfirmDelete = async () => {
        if (!incidentASupprimer) return;
        const incident = incidentASupprimer;
        handleFermerConfirmation();
        try {
            const response = await deleteIncident(idSession, epreuveCode, incident.idIncident);
            if (response.data?.success) {
                // Supprime l'incident de l'état
                retirerIncident(incident.idIncident);
                
                // Si l'incident supprimé était celui en cours de visualisation, on ferme le détail
                if (selectedIncidentId === incident.idIncident) {
                    setSelectedIncident(null);
                    setSelectedIncidentId(null);
                }
                
                setMessageSnackbar("Incident supprimé avec succès !");
                setOuvertSucces(true);
            } else {
                setMessageSnackbar("Erreur lors de la suppression de l'incident.");
                setOuvertEchec(true);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setMessageSnackbar("Erreur lors de la communication avec le serveur.");
            setOuvertEchec(true);
        }
    };

    return (
        <Stack direction="row" spacing={2} height="100%" justifyContent={"center"}>

            <Stack sx={{
                width: selectedIncident ? "40%" : "50%",
                transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out',

            }}

            >
                <IncidentListe 
                    liste={allIncidents} 
                    onClick={handleClickIncident} 
                    onDeleteIncident={handleOuvrirConfirmation} 
                    selectedIncidentId={selectedIncidentId} 
                />
            </Stack>

            <Stack
                sx={{
                    width: selectedIncident ? "60%" : "0%",
                    transition: 'width 0.3s ease-in-out',
                }}

            >
                {selectedIncident &&
                    <IncidentDetail
                        incident={selectedIncident}
                        onClose={() => setSelectedIncident(null)}
                        onClick={() => setSelectedIncident(null)}
                        ajouterIncident={ajouterIncident}
                        retirerIncident={retirerIncident}
                        setOuvertSucces={setOuvertSucces}
                        setOuvertEchec={setOuvertEchec}
                        setMessageSnackbar={setMessageSnackbar}
                    />
                }
            </Stack>
            <Snackbar
                open={ouvertSucces}
                autoHideDuration={3000}
                onClose={() => setOuvertSucces(false)}
            >
                <Alert severity="success" variant="filled">
                    {messageSnackbar}
                </Alert>
            </Snackbar>
            <Snackbar
                open={ouvertEchec}
                autoHideDuration={3000}
                onClose={() => setOuvertEchec(false)}
            >
                <Alert severity="error" variant="filled">
                    {messageSnackbar}
                </Alert>
            </Snackbar>

            {/* Modal de confirmation de suppression moderne */}
            <Dialog
                open={Boolean(incidentASupprimer)}
                onClose={handleFermerConfirmation}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 1,
                        maxWidth: 440
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
                    Confirmer la suppression
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "text.primary" }}>
                        Voulez-vous vraiment supprimer l'incident <strong>{incidentASupprimer?.titre}</strong> ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleFermerConfirmation} color="inherit" sx={{ fontWeight: 600 }}>
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ fontWeight: 600, borderRadius: 2 }}>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}