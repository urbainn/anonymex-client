import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { APIIncident } from '../../../../../contracts/incidents';
import { grey, red } from "@mui/material/colors";
import { useState } from "react";

type IncidentType = "resolu" | "non resolu";

interface IncidentCardProps {
    incident: APIIncident;
    onClick: (incident: APIIncident) => void;
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

                    <Stack >
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
        </Card>
    );
}

export default IncidentCard;