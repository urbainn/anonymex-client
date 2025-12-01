
import { Stack, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MyTextField from "./MyTextField";

interface DateTextFieldProps {
    date: string;
    fonctionSave: (newVal: string) => void;
}




function formatDate(date: string): string {
    // Date reçue sous la forme 12 mars 2024

    const mois: Record<string, string> = {
        "janvier": "01",
        "février": "02",
        "mars": "03",
        "avril": "04",
        "mai": "05",
        "juin": "06",
        "juillet": "07",
        "août": "08",
        "septembre": "09",
        "octobre": "10",
        "novembre": "11",
        "décembre": "12"
    };

    const parties = date.split(" ");

    if (parties.length === 3) {
        const jour = parties[0].padStart(2, '0');
        const moisStr = parties[1].toLowerCase().padStart(2, '0');
        const annee = parties[2].padStart(4, '0');

        if (mois[moisStr]) {
            return `${annee}-${mois[moisStr]}-${jour}`;
        }

    }


    return ""

}



function bonneDate(date: string, fonctionSave: (newVal: string) => void): boolean {
    // La regex vérifie ISO YYYY-MM-DD

    console.log("Vérification de la date :", date);
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        fonctionSave(date);
        return true;
    }
    return false;
}


function DateTextField({ date, fonctionSave }: DateTextFieldProps) {

    const [tempValeur, setTempValeur] = useState<string>(formatDate(date));


    const ref = useRef<HTMLInputElement>(null);


    useEffect(() => {
        ref.current?.focus();
    }, []);

    useEffect(() => {
        console.log("Date modifiée :", tempValeur);
    }, [tempValeur]);


    return (
        <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>
            <MyTextField
                inputRef={ref}
                type="date"
                value={tempValeur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTempValeur(e.target.value); console.log("Changement de date:", e.target.value); }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        bonneDate(tempValeur, fonctionSave);
                        console.log("Date entrée:", tempValeur);
                    }
                }}
                fullWidth
                size="small"

            />

            <Stack
                sx={{
                    bgcolor: colors.green[100],
                    borderRadius: 100,
                    padding: 0.75,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: colors.green[200] }
                }}
                onClick={() => { bonneDate(tempValeur, fonctionSave); }}

            >
                <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
            </Stack>
        </Stack>
    )
}

export default DateTextField;