import theme from "../../theme/theme";
import { Card, CardActionArea, Stack, Typography, Zoom } from "@mui/material";
import { grey, indigo } from '@mui/material/colors';
import type { JSX } from "react";
import { themeEpreuves } from "../../theme/epreuves";

import IconeRond from "../../components/IconeRond";
import CheckIcon from '@mui/icons-material/Check';

type ValueStatut = 0 | 1 | 2 | 3 | 4 | 5;

const epreuveStatutTextes: Record<ValueStatut, string> = {
    0: 'Toutes les épreuves',
    1: 'Matériel non imprimé',
    2: 'Materiel imprimé',
    3: 'En attente de dépot',
    4: 'Dépot complet',
    5: 'Notes exportées',
}

const epreuveStatutSubtextes: Record<ValueStatut, string> = {
    0: 'Afficher toutes les épreuves.',
    1: 'Examens pour lesquels le matériel n’a pas été imprimé.',
    2: 'Examens pour lesquels le matériel a été imprimé.',
    3: 'Examens en attente de dépôt des copies.',
    4: 'Examens pour lesquels toutes les copies ont été déposées.',
    5: 'Afficher les examens pour lesquels les notes ont été exportées.',
}

interface EpreuvesFiltresProps {
    value: ValueStatut;
    nombreEpreuves: number;
    selected: boolean;
    onClick: () => void;
}

function EpreuvesFiltres({ value, nombreEpreuves, selected, onClick }: EpreuvesFiltresProps): JSX.Element {
    return (
        <Card variant="outlined" sx={{ backgroundColor: grey[50], borderRadius: 2 }}>
            <CardActionArea onClick={onClick} sx={{
                bgcolor: selected ? grey[300] : grey[50],
                '&:hover': { backgroundColor: selected ? grey[400] : grey[50] },
                'transition': 'background-color 0.3s',
            }}>

                <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
                    <Stack direction={"row"}>
                        <Stack alignItems={'center'} justifyContent='center' alignSelf={'stretch'} 
                            sx={{
                                width: '5rem', fontSize: '1.2rem',
                                bgcolor: themeEpreuves.status[value] + '8F', // note: on rajoute 8F en ALPHA, c'est un byte hexédécimal supplémentaire pour l'opacité
                                padding: 2
                            }}
                        >
                            <Typography variant="h5" fontWeight={500} color="grey.800">{nombreEpreuves}</Typography>
                        </Stack>

                        <Stack padding={2} direction="row" alignItems="center" spacing={2}>
                            <Stack direction="column">
                                <Typography color="grey.600" fontWeight={500} variant="h5"> {epreuveStatutTextes[value]} </Typography>
                                <Typography variant="body1" color={theme.palette.text.secondary}>
                                    {epreuveStatutSubtextes[value]}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    {selected && (
                        <Zoom in={selected} timeout={300}>
                            <Stack padding={2}>
                                <IconeRond icon={<CheckIcon />} bgcolor={indigo[500] + '4F'} />
                            </Stack>
                        </Zoom>
                    )}

                </Stack>



            </CardActionArea>
        </Card>
    );
}

export default EpreuvesFiltres;