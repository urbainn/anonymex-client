import { Box, Button, Icon, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import type { APIIncident } from "../../../../../contracts/incidents";
import { URL_API_BASE } from "../../../../../utils/api";
import { grey } from "@mui/material/colors";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconRondV2 from "../../../../../components/IconesRondV2";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MyTextField from "../textfields/MyTextField";
import CircularProgress from '@mui/material/CircularProgress';
import BoutonStandard from "../../components/BoutonStantard";

interface IncidentDetailProps {
    incident: APIIncident;
    onClick: () => void;
    onClose: (id: number) => void;
}


export default function IncidentDetail(props: IncidentDetailProps) {

    const [numero, setNumero] = React.useState<string | undefined>(props.incident.codeAnonymat);
    const [noteValue, setNoteValue] = React.useState<number | undefined>(props.incident.noteQuart);
    const [fichier, setFichier] = React.useState<string>("");
    const [loading, setLoading] = React.useState(true);


    const [errors, setErrors] = React.useState({
        note: "",
        numero: ""
    });

    useEffect(() => {
        console.log("Incident sélectionné 2 :", props.incident);
    }, [props.incident]);



    useEffect(() => {
        if (!props.incident || !props.incident.idIncident) {
            console.error("Incident invalide :", props.incident);
            return;
        }
        console.log("Récupération du fichier de l'incident N°" + props.incident.idIncident);

        const getFichier = async () => {
            const rep = await fetch(`${URL_API_BASE}/documents/incidents/${props.incident.idIncident}/scan.webp`);
            console.log("Réponse de la requête pour le fichier de l'incident :", rep);
            setFichier(rep.url);
            setNoteValue(props.incident.noteQuart);
            setNumero(props.incident.codeAnonymat);
            setLoading(false);
        }

        try {
            getFichier();
        } catch (error) {
            console.error("Erreur lors de la récupération du fichier de l'incident :", error);
            setLoading(false);
        }

    }, [props.incident]);


    const handleViewFile = (url: string) => {
        const previewWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (previewWindow) {
            previewWindow.focus();
        }
    };

    function FormValide(numero: string | null, note: number | null) {
        const newErrors = {
            note: "",
            numero: ""
        };

        if (note === null) {
            newErrors.note = "La note est requise.";
        } else if (note < 0 || note > 20) {
            newErrors.note = "La note doit être comprise entre 0 et 20.";
        } else if (isNaN(note)) {
            newErrors.note = "La note doit être un nombre.";
        }

        if (numero === null || numero.trim() === "") {
            newErrors.numero = "Le numéro d'anonymat est requis.";
        } else if (numero.length > 6) {
            newErrors.numero = "Max 6 caractères.";
        }

        const hasError = newErrors.note || newErrors.numero;

        setErrors(newErrors);

        if (!hasError) {
            // TODO Enregistrer les modifications (en attendant, on ferme le détail de l'incident).
            props.onClose(props.incident.idIncident);
        }
    }

    return (
        <Stack gap={2}>


            <Stack direction={"row"} justifyContent="space-between" alignItems="center"  >
                <Stack width={"70%"}>
                    <TransformWrapper  >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <Stack direction={"column"} p={1}>
                                <Stack gap={2} direction="row" justifyContent="space-between" alignItems="center" >
                                    <Box onClick={props.onClick} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        <ArrowBackIosIcon />
                                        <Typography variant="h6" fontWeight={500} color={grey[800]} >Retour</Typography>
                                    </Box>
                                    <Stack direction="row" gap={1} justifyContent="center">
                                        <IconRondV2 onClick={() => zoomIn()}>
                                            <ZoomInIcon />
                                        </IconRondV2>
                                        <IconRondV2 onClick={() => zoomOut()}>
                                            <ZoomOutIcon />
                                        </IconRondV2>
                                        <IconRondV2 onClick={() => resetTransform()}>
                                            <RestartAltIcon />
                                        </IconRondV2>
                                        <IconRondV2 onClick={() => handleViewFile(fichier)}>
                                            <RemoveRedEyeIcon />
                                        </IconRondV2>
                                    </Stack>
                                </Stack>

                                <TransformComponent wrapperStyle={{ width: "100%", height: "470px", }}>
                                    {loading ? (
                                        <Stack width="100%" height="470px" justifyContent="center" alignItems="center">
                                            <CircularProgress />
                                        </Stack>
                                    ) : (
                                        <img
                                            src={fichier}
                                            alt={"Scan incident " + props.incident.idIncident} //{"Image de l'incident N°" + props.incident.idIncident} 
                                            style={{ maxWidth: "100%", height: "470px" }}
                                        />
                                    )}

                                </TransformComponent>
                            </Stack>
                        )}
                    </TransformWrapper>
                </Stack>

                <Stack direction={"column"} width={"30%"} spacing={2}>
                    <MyTextField
                        type="text"
                        label="Numéro Anonymat"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        error={!!errors.numero}
                        helperText={errors.numero}
                    />
                    <Stack direction="row" alignItems="center" >
                        <MyTextField
                            type="number"
                            label="Note"
                            value={noteValue ?? 0}
                            onChange={(e) => setNoteValue(Number(e.target.value))}
                            error={!!errors.note}
                            helperText={errors.note}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <KeyboardArrowUpIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => setNoteValue((prev) => prev !== undefined ? Math.min(prev + 1, 20) : 0)}
                                        />
                                        <KeyboardArrowDownIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => setNoteValue((prev) => prev !== undefined ? Math.max(prev - 1, 0) : 0)}
                                        />
                                    </InputAdornment>
                                ),
                            }}

                        />

                    </Stack>
                    <BoutonStandard onClick={() => FormValide(numero ?? null, noteValue ?? null)}>
                        Enregistrer
                    </BoutonStandard>
                </Stack>
            </Stack>

        </Stack>
    );
}