import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type IncidentType = "resolu" | "non resolu";

interface IncidentCardProps {
    infosIncident: {
        nomIncident: string;
        descriptionIncident: string;
        id: number;
    };
    onClick: (id: number) => void;
    type?: IncidentType;
}

function IncidentCard({ infosIncident, onClick, type = "non resolu" }: IncidentCardProps) {
    const isResolved = type === "resolu";

    const colors = {
        bg: isResolved ? '#e0f9dc' : '#F9DEDC',
        text: isResolved ? '#328521' : '#852221',
        border: isResolved ? '#e0f9dc' : '#F9DEDC'
    };

    return (
        <Card
            variant="outlined"
            sx={{
                borderColor: colors.border,
                backgroundColor: '#fdf0ef87',
                borderRadius: '10px'
            }}
        >
            <CardActionArea
                onClick={() => onClick(infosIncident.id)}
                sx={{ display: 'flex', alignItems: 'center', p: 1.5}}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        width={40}
                        height={40}
                        padding={2}
                        borderRadius="50%"
                        bgcolor={colors.bg}
                        color={colors.text}
                    >
                        {isResolved ? <CheckCircleIcon /> : <ErrorIcon />}
                    </Stack>

                    <Stack>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={isResolved ? "#000000d4" : "#852221"}
                        >
                            {infosIncident.nomIncident + " - N°" + infosIncident.id} 
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {infosIncident.descriptionIncident}
                        </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

export default IncidentCard;