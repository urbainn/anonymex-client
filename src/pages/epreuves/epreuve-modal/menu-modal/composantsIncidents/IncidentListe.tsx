import IncidentCard from './IncidentCard';
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import type { APIIncident } from '../../../../../contracts/incidents';
import { grey } from '@mui/material/colors';

//import { useIsOverflow } from '../../../../../functions/IsOverflow';
//import { useRef } from 'react';


interface IncidentListeProps {
    liste: APIIncident[];
    onClick: (incident: APIIncident) => void;
    onDeleteIncident?: (incident: APIIncident) => void; // Ajout
    onDeleteAllIncidents?: () => void;
    selectedIncidentId: number | null;
}

export default function IncidentListe({ liste, onClick, onDeleteIncident, onDeleteAllIncidents, selectedIncidentId }: IncidentListeProps) {

    const nbIncidents = liste.length;

    return (
        <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                    <Typography variant='h6' color={grey[800]} >
                        Liste des incidents
                    </Typography>
                    <Typography variant='body2' color={grey[600]} >
                        {nbIncidents} incident{nbIncidents > 1 ? 's' : ''} enregistré{nbIncidents > 1 ? 's' : ''}
                    </Typography>
                </Stack>
                {nbIncidents > 0 && onDeleteAllIncidents && (
                    <Tooltip title="Supprimer tous les incidents">
                        <IconButton size="small" onClick={onDeleteAllIncidents} sx={{ color: grey[500], '&:hover': { color: '#f44336' } }}>
                            <DeleteSweepIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
            <Stack spacing={2} height={450} overflow="scroll" sx={{ borderBottom: `2px solid ${grey[400]}`, pr: 2 }} >
                {liste.map((incident) => (

                    <IncidentCard
                        key={incident.idIncident}
                        incident={incident}
                        onClick={onClick}
                        onDelete={onDeleteIncident} // Ajout
                        selected={incident.idIncident === selectedIncidentId}
                    />
                ))}

            </Stack>
        </Stack >
    );
}