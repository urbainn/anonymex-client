import FichierIncident from './FichierIncident';
import { Stack } from '@mui/material';

interface Fichier {
    nom: string;
}

interface FichierListeProps {
    liste: Fichier[];
}

export default function FichierListe({ liste }: FichierListeProps) {
    return (
        <Stack gap={2}>
            {liste.map((fichier) => (
                <FichierIncident key={fichier.nom} nomFichier={fichier.nom} />
            ))}
        </Stack>
    );
}