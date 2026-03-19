import IncidentCard from './IncidentCard';
import { Stack } from '@mui/material';

interface Incident {
    nom: string;
    description: string;
    id: number;
}

interface IncidentListeProps {
    liste: Incident[];
    onClick: (id: number) => void;
}

export default function IncidentListe({ liste, onClick }: IncidentListeProps) {
    return (
        <Stack gap={2}>
            {liste.map((incident) => (
                <IncidentCard 
                    key={incident.id}
                    infosIncident={{
                        nomIncident: incident.nom,
                        descriptionIncident: incident.description,
                        id: incident.id
                    }}
                    onClick={onClick}
                />
            ))}
        </Stack>
    );
}