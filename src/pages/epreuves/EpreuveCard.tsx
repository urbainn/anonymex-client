import { Box, Card, CardActionArea, Stack, Typography, Chip, Icon } from "@mui/material";
import type { APIEpreuve } from "../../contracts/epreuves";
import { themeEpreuves } from "../../theme/epreuves";
import { deepPurple, grey, purple } from "@mui/material/colors";
import theme from "../../theme/theme";

import Icons from "../../components/Icons";


import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import PrintDisabledIcon from '@mui/icons-material/PrintDisabled';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import type { JSX } from "react";


type EpreuveStatut = 1 | 2 | 3 | 4 | 5;

const epreuveStatutTextes: Record<EpreuveStatut, string> = {
    1: 'Matériel non imprimé',
    2: 'Materiel imprimé',
    3: 'En attente de dépot',
    4: 'Dépot complet',
    5: 'Notes exportées',
}


const colorIcons = "grey.800";

const epreuveStatutIcons: Record<EpreuveStatut, JSX.Element> = {
    1: <PrintDisabledIcon/>,
    2: <PrintIcon />,
    3: <CloseIcon  />,
    4: <DoneIcon />,
    5: <DoneAllIcon />,
}


interface EpreuveCardProps extends APIEpreuve { }

export function EpreuveCard(props: EpreuveCardProps) {
    const date = new Date(props.date);
    return (
        <Card variant="outlined" sx={{ backgroundColor: grey[50], borderRadius: 2 }}>
            <CardActionArea sx={{ '&:hover': { backgroundColor: grey[100] } }}>
                <Stack direction="row"  alignItems="center" >

                    <Stack padding={2} direction="row" alignItems="center" spacing={2}>
                        <Icons icon={epreuveStatutIcons[props.statut]} bgcolor={themeEpreuves.status[props.statut]} />
                        <Stack direction="column">
                            <Typography variant="h6">{props.nom}</Typography>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body2">{props.code}</Typography>
                                <Typography variant="body2"> - </Typography>
                                <Typography variant="body2">{props.salles.join(', ')}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                <Stack flexGrow={1} />
                    <Stack direction="column" spacing={1} padding={2} alignItems="flex-end">
                        <Chip label={`${epreuveStatutTextes[props.statut]}`} size="small" sx={{ bgcolor: themeEpreuves.status[props.statut] + '8F'}} />
                    </Stack>    

                    <Stack alignItems={'center'} justifyContent='center' alignSelf={'stretch'}
                        sx={{
                            width: '5rem', fontSize: '1.2rem',
                            bgcolor: themeEpreuves.status[props.statut] + '8F', // note: on rajoute 8F en ALPHA, c'est un byte hexédécimal supplémentaire pour l'opacité
                            
                        }}
                    >
                        {date.getHours().toString().padStart(2, '0')}:
                        {date.getMinutes().toString().padStart(2, '0')}
                    </Stack>
                </Stack>


            </CardActionArea>
        </Card>
    );
}