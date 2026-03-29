import { Stack } from "@mui/material";
import IncidentListe from "./IncidentListe";
import IncidentDetail from "./IncidentDetail";
import { useState } from "react";

import type { APIIncident, APIListIncidents } from '../../../../../contracts/incidents';
import { getIncidents } from "../../../../../contracts/incidents";
import { useEffect } from "react";
import { set } from "zod";


interface IncidentsCompletsProps {
    idSession: number;
    epreuveCode: string;
}

export function IncidentsComplets(props: IncidentsCompletsProps) {

    const [allIncidents, setAllIncidents] = useState<APIIncident[]>([]);
    const [selectedIncident, setSelectedIncident] = useState<APIIncident | null>(null);
    const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(null);

    const [ouvertSucces, setOuvertSucces] = useState(false);
    const [ouvertEchec, setOuvertEchec] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState("");

    useEffect(() => {
        const getAllIncidents = async () => {
            try {
                const response = await getIncidents(props.idSession, props.epreuveCode);
                console.log("Incidents récupérés :", response);
                if (response.data?.incidents) {
                    setAllIncidents(response.data.incidents);
                    console.log("Incidents enregistrés dans le state :", response.data.incidents.length);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des incidents :", error);
            }
        };

        getAllIncidents();
    }, [props.idSession, props.epreuveCode]);

    const handleClickIncident = (incident: APIIncident) => {
        setSelectedIncident(incident);
        setSelectedIncidentId(incident.idIncident);
    }


    const ajouterIncident = (incident: APIIncident) => {
        setAllIncidents((prev) => [...prev, incident]);
    }

    const retirerIncident = (idIncident: number) => {
        setAllIncidents((prev) => prev.filter(incident => incident.idIncident !== idIncident));
    }


    return (
        <Stack direction="row" spacing={2} height="100%" justifyContent={"center"}>

            <Stack sx={{
                width: selectedIncident ? "40%" : "50%",
                transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out',

            }}

            >
                <IncidentListe liste={allIncidents} onClick={handleClickIncident} selectedIncidentId={selectedIncidentId} />
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

        </Stack>
    )
}