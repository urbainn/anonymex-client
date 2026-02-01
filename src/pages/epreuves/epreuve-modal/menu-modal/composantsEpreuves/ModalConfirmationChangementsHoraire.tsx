
import Modal from "@mui/material/Modal"
import { Button, Stack, Typography } from "@mui/material";
import { colors } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";

interface ModalConfirmationChangementsProps {
    ouvert: boolean;
    setOuvert: (ouvert: boolean) => void;
    handleSave: (date: number, duree: number) => void;
    ancien: { date: number, duree: number };
    nouveau: { date: number, duree: number };
}


function formatHoraire(date: number, duree: number): string {
    console.log("date : ", date);
    const dateConvert = new Date(date);
    console.log(dateConvert);
    const dateFin = new Date(dateConvert.getTime() + duree * 60000);

    return dateConvert.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + dateFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


function ModalConfirmationChangementsHoraire({ ouvert, setOuvert, handleSave, ancien, nouveau }: ModalConfirmationChangementsProps) {

    useEffect(() => {
        console.log("ancien :", ancien);
        console.log("nouveau :", nouveau);
    }, [ouvert]);

    return (

        <Modal open={ouvert} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 500, height: 200, margin: "auto" }}>
            <Stack >
                <Stack height={20} bgcolor={colors.red[300]} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <Stack direction="column" spacing={4} p={4} alignItems="center" justifyContent="center" sx={{ bgcolor: colors.grey[200], borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Stack spacing={2}>
                        <Stack >
                            <Typography variant="h6" color={colors.grey[700]} >
                                Voulez vous modifier l'horaire de l'épreuve :
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"}>
                                <Typography variant="h5" fontWeight={"bold"}  >
                                    {formatHoraire(ancien.date, ancien.duree)}
                                </Typography>
                                <CloseIcon sx={{ color: colors.red[700] }} fontSize="large" />
                            </Stack>
                        </Stack>
                        <Stack>

                            <Typography variant="h6" color={colors.grey[700]} >
                                Par le nouvel horaire :
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"}>
                                <Typography variant="h5" fontWeight={"bold"} >
                                    {formatHoraire(nouveau.date, nouveau.duree)}
                                </Typography>
                                <CheckIcon sx={{ color: colors.green[700] }} fontSize="large" />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={4}>
                        <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { handleSave(nouveau.date, nouveau.duree); setOuvert(false); }}>
                            Confirmer le changement
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: colors.red[100], color: colors.grey[900], py: 1, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => { setOuvert(false); }}>
                            Annuler
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>


    )
} export default ModalConfirmationChangementsHoraire;