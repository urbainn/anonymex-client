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

    //const ref = useRef<HTMLDivElement | null>(null)
    //const isOverflow = useIsOverflow(ref);
    //console.log(isOverflow);

    return (
        <Stack spacing={2}>
            <Typography variant='h6' color={grey[800]} >
                Liste des incidents
            </Typography>
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