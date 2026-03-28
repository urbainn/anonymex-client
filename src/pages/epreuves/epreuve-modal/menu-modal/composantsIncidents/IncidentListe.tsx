import IncidentCard from './IncidentCard';
import { Stack, Typography } from '@mui/material';
import type { APIIncident } from '../../../../../contracts/incidents';
import { grey } from '@mui/material/colors';

//import { useIsOverflow } from '../../../../../functions/IsOverflow';
//import { useRef } from 'react';


interface IncidentListeProps {
    liste: APIIncident[];
    onClick: (incident: APIIncident) => void;
    selectedIncidentId: number | null;
}

export default function IncidentListe({ liste, onClick, selectedIncidentId }: IncidentListeProps) {

    const nbIncidents = liste.length;

    return (
        <Stack spacing={2}>
            <Stack>
                <Typography variant='h6' color={grey[800]} >
                    Liste des incidents
                </Typography>
                <Typography variant='body2' color={grey[600]} >
                    {nbIncidents} incident{nbIncidents > 1 ? 's' : ''} enregistré{nbIncidents > 1 ? 's' : ''}
                </Typography>
            </Stack>
            <Stack spacing={2} height={450} overflow="scroll" sx={{ borderBottom: `2px solid ${grey[400]}`, pr: 2 }} >
                {liste.map((incident) => (

                    <IncidentCard
                        key={incident.idIncident}
                        incident={incident}
                        onClick={onClick}
                        selected={incident.idIncident === selectedIncidentId}
                    />
                ))}

            </Stack>
        </Stack >
    );
}