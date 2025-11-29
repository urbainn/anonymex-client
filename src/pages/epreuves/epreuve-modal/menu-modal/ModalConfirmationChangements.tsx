
import Modal from "@mui/material/Modal"
import { Button, Stack, Typography } from "@mui/material";
import { colors } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface ModalConfirmationChangementsProps {
    ouvert: boolean;
    setOuvert: (ouvert: boolean) => void;
    handleSaveDate: (newVal: string) => void;
    oldVal: string;
    newVal: string;
}

function ModalConfirmationChangements({ ouvert, setOuvert, handleSaveDate, oldVal, newVal }: ModalConfirmationChangementsProps) {
    return (

        <Modal open={ouvert} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 500, height: 200, margin: "auto" }}>
            <Stack >
                <Stack height={20} bgcolor={colors.red[100]} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <Stack direction="column" spacing={4} p={4} alignItems="center" justifyContent="center" sx={{ bgcolor: colors.grey[200], borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Stack spacing={2}>
                        <Stack >
                            <Typography variant="h6" color={colors.grey[700]} >
                                Vous allez modifier la date de l'épreuve :
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"}>
                                <Typography variant="h5" fontWeight={"bold"}  >
                                    {oldVal}
                                </Typography>
                                <CloseIcon sx={{ color: colors.red[700] }} fontSize="large" />
                            </Stack>
                        </Stack>
                        <Stack>

                            <Typography variant="h6" color={colors.grey[700]} >
                                Par la nouvelle date :
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center" alignContent={"center"}>
                                <Typography variant="h5" fontWeight={"bold"} >
                                    {newVal}
                                </Typography>
                                <CheckIcon sx={{ color: colors.green[700] }} fontSize="large" />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={4}>
                        <Button variant="contained" sx={{ bgcolor: colors.blue[100], color: colors.grey[900], py: 1 }} onClick={() => { handleSaveDate(newVal); setOuvert(false); }}>
                            Confirmer le changement
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: colors.red[100], color: colors.grey[900], py: 1 }} onClick={() => { setOuvert(false); }}>
                            Annuler
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>


    )
} export default ModalConfirmationChangements;