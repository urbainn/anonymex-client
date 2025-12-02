
import { Stack, Typography, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import 'dayjs/locale/fr';

interface HoraireTextFieldProps {
    date: number;
    dureeMinutes: number;
    fonctionSave: (debut: number, fin: number) => void;
}

function estBonHoraire(date: number, debut: number, fin: number, fonctionSave: (debut: number, fin: number) => void): number {

    if (debut === fin) {
        return -1;
    }

    // Changement de focus
    if (!fin || !debut) {
        return 0;
    }

    if (fin > debut) {

        fonctionSave(debut, fin);
        return 1;
    }

    return -1;
}



function HorairesTextField({ date, dureeMinutes, fonctionSave }: HoraireTextFieldProps) {

    const [tempValeurDebut, setTempValeurDebut] = useState<number | null>(null);
    const [tempValeurFin, setTempValeurFin] = useState<number | null>(null);


    const firstRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstRef.current?.focus();
    }, []);


    useEffect(() => {
        console.log("Calcul debut et fin")
        // départ sous forme de nombre (timestamp)

        // conversion en dayjs
        const dateDebut = dayjs(date);

        // calcul de fin
        const dateFin = dateDebut.add(dureeMinutes, "minute");

        // EXTRACTION en number
        setTempValeurDebut(dateDebut.valueOf());
        setTempValeurFin(dateFin.valueOf());

        console.log("Date debut:", dateDebut.valueOf(), "Date fin:", dateFin.valueOf());

    }, []);



    return (
        <Stack direction="row" spacing={2} alignItems="center" width={"100%"} justifyContent={"space-between"}>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                <TimePicker
                    ref={firstRef}
                    value={tempValeurDebut !== null ? dayjs(tempValeurDebut) : null}
                    onChange={(newValue: Dayjs | null) => setTempValeurDebut(newValue ? newValue.valueOf() : null)}
                    ampm={false}
                    sx={{ maxWidth: 130 }}
                    slotProps={{
                        textField: {
                            size: 'small',

                            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    secondRef.current?.focus();
                                }
                            }
                        },
                    }}
                />
            </LocalizationProvider>



            <Typography fontWeight="bold"> - </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker

                    ref={secondRef}
                    value={tempValeurDebut !== null ? dayjs(tempValeurFin) : null}
                    onChange={(newValue: Dayjs | null) => setTempValeurFin(newValue ? newValue.valueOf() : null)}
                    ampm={false}
                    sx={{ maxWidth: 130 }}
                    slotProps={{
                        textField: {
                            size: 'small',

                            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    estBonHoraire(date, tempValeurDebut!, tempValeurFin!, fonctionSave)
                                }
                            }

                        },

                    }}
                />
            </LocalizationProvider>


            <Stack
                sx={{
                    bgcolor: colors.green[100],
                    borderRadius: 100,
                    padding: 0.75,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: colors.green[200] }
                }}
                onClick={() => { estBonHoraire(date, tempValeurDebut!, tempValeurFin!, fonctionSave) }}

            >
                <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
            </Stack>
        </Stack>
    )
}

export default HorairesTextField;