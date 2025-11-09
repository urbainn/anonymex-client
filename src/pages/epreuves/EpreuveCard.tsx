import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import type { APIEpreuve } from "../../contracts/epreuves";
import { themeEpreuves } from "../../theme/epreuves";

interface EpreuveCardProps extends APIEpreuve {}

export function EpreuveCard(props: EpreuveCardProps) {
    return (
        <Card>
            <CardActionArea>
                <Stack direction="row" justifyContent="space-between">
                    <Box padding={2}>
                        <Typography variant="h6">{props.nom}</Typography>
                        <Typography variant="body2">{props.salles.join(', ')}</Typography>
                    </Box>

                    <Stack alignItems={'center'} justifyContent='center' alignSelf={'stretch'}
                        sx={{ width: '5rem', fontSize: '1.2rem',
                            bgcolor: themeEpreuves.status[props.statut] + '8F' // note: on rajoute 8F en ALPHA, c'est un byte hexédécimal supplémentaire pour l'opacité
                        }}
                    >
                        12:00
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}