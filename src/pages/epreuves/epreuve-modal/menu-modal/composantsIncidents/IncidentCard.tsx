import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { APIIncident } from '../../../../../contracts/incidents';
import { red } from "@mui/material/colors";

type IncidentType = "resolu" | "non resolu";

interface IncidentCardProps {
    incident: APIIncident;
    onClick: (incident: APIIncident) => void;
    onDelete?: (incident: APIIncident) => void; // Ajout de la fonction de suppression si nécessaire
    type?: IncidentType;
    selected: boolean;
}

function IncidentCard(props: IncidentCardProps) {
    const isResolved = props.type === "resolu";


    const colors = {
        bg: isResolved ? '#e0f9dc' : '#F9DEDC',
        text: isResolved ? '#328521' : '#852221',
        border: isResolved ? '#e0f9dc' : '#F9DEDC'
    };

    return (
        <Card
            variant="outlined"
            sx={{

                backgroundColor: props.selected ? colors.bg + 'AF' : '#fdf0ef87',
                borderRadius: '10px',
                flexShrink: 0,
                height: 70,
                border: 'none',
                transition: 'background-color 0.3s ease',
                position: 'relative', // Nécessaire pour placer la croix
            }}
        >
            <CardActionArea
                onClick={() => {
                    props.onClick(props.incident);
                }}

                sx={{
                    height: 70,
                }}
            >
                <Stack direction="row" spacing={2} width={"100%"} alignItems="center">
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        width={70}
                        height={70}
                        bgcolor={colors.bg}
                    >
                        {isResolved ? <CheckCircleIcon /> : <ErrorIcon fontSize="large" sx={{ color: red[300] }} />}
                    </Stack>

                    <Stack sx={{ pr: props.onDelete ? 5 : 2 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={isResolved ? "#000000d4" : red[500]}
                        >
                            {props.incident.titre}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {props.incident.details}
                        </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>

            {/* Croix de suppression en position absolue */}
            {props.onDelete && (
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: red[300],
                        zIndex: 2, // S'assure que le clic n'est pas intercepté par CardActionArea
                        '&:hover': { color: red[600], backgroundColor: 'rgba(211, 47, 47, 0.04)' }
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche de déclencher le onClick de la carte
                        e.preventDefault();
                        props.onDelete!(props.incident);
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}            
        </Card>
    );
}

export default IncidentCard;