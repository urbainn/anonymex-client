
import { Stack, Typography, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MyTextField from "./MyTextField";

interface HoraireTextFieldProps {
    debut: string;
    fin: string;
    fonctionSave: (newVal: string) => void;
}

function HoursToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function minutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}



function estBonHoraire(debut: string, fin: string, fonctionSave: (newVal: string) => void): number {

    console.log("Vérification des horaires:", debut, fin);

    const debutHoraire = HoursToMinutes(debut);
    const finHoraire = HoursToMinutes(fin);

    console.log("Début horaire:", debutHoraire, "Fin horaire:", finHoraire);

    if (finHoraire === debutHoraire) {
        return -1;
    }

    // Changement de focus
    if (!finHoraire || !debutHoraire) {
        return 0;
    }

    if (finHoraire > debutHoraire) {
        fonctionSave(minutesToHours(debutHoraire) + " - " + minutesToHours(finHoraire));
        return 1;
    }

    return -1;
}


function HorairesTextField({ debut, fin, fonctionSave }: HoraireTextFieldProps) {

    const [tempValeurDebut, setTempValeurDebut] = useState<string>(debut);
    const [tempValeurFin, setTempValeurFin] = useState<string>(fin);

    const firstRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstRef.current?.focus();
    }, []);



    return (
        <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>
            <MyTextField
                key="debut"
                type="time"
                value={tempValeurDebut}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTempValeurDebut(e.target.value) }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        {/*if (estBonHoraire(tempValeurDebut, tempValeurFin, fonctionSave) == 0) {
                            secondRef.current?.focus();
                        }
                            */}
                        secondRef.current?.focus();
                    }
                }}
                fullWidth
                size="small"
                inputRef={firstRef}

            />

            <Typography fontWeight="bold"> - </Typography>

            <MyTextField
                key="fin"
                type="time"
                value={tempValeurFin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValeurFin(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        if (estBonHoraire(tempValeurDebut, tempValeurFin, fonctionSave) == 0) {
                            firstRef.current?.focus();
                        }
                    }
                }}
                fullWidth
                size="small"
                inputRef={secondRef}
            />


            <Stack
                sx={{
                    bgcolor: colors.green[100],
                    borderRadius: 100,
                    padding: 0.75,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: colors.green[200] }
                }}
                onClick={() => { estBonHoraire(tempValeurDebut, tempValeurFin, fonctionSave) }}

            >
                <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
            </Stack>
        </Stack>
    )
}

export default HorairesTextField;