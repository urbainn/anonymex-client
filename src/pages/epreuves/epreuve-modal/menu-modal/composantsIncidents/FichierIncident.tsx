import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';

interface FichierIncidentProps {
    nomFichier: string
}

export default function FichierIncident({nomFichier}: FichierIncidentProps){
    const [progress, setProgress] = React.useState(0);

    // TODO Pour l'instant la lecture du document ne se fait pas, une barre de progression fictive est donc implementee.
    React.useEffect(() => {
            const timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        return 0;
                    }
                    else {
                        const diff = Math.random() * 10;
                        return Math.min(prevProgress + diff, 100);
                    }
                });
            }, 1000);
            return () => { clearInterval(timer);
            };
        }, []);

    return(
        <>
            <Stack gap={2}>
                <Typography variant="body1">{nomFichier}</Typography>
                <Box>
                    <LinearProgress variant="determinate" value={progress} color="primary"/>
                    <Box>
                        <Typography variant="body2">{`${Math.round(progress)}%`}</Typography>
                    </Box>
                </Box>
            </Stack>
        </>
    )
}