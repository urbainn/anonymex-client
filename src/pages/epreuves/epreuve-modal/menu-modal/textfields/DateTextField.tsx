
import { Stack, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MyTextField from "./MyTextField";

interface DateTextFieldProps {
    date: string;
    fonctionSave: (newVal: string) => void;
}

function formatDate(date: string): string {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        console.log("Date invalide, retour chaîne vide");
        return "";
    }

    return d.toISOString().split("T")[0];
}


function bonneDate(date: string, fonctionSave: (newVal: string) => void): boolean {

    console.log("Vérification de la date:", date);

    const dateTest = new Date(date);

    if (!isNaN(dateTest.getTime())) {
        fonctionSave(formatDate(date));
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