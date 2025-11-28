
import { Stack, colors } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MyTextField from "./MyTextField";

interface DateTextFieldProps {
    date: string;
    fonctionSave: (newVal: string) => void;
}

function formatDate(date: string): string {

    // Date ISO UTC 0 et chez nous UTC + 1 donc entre à 00h et 01h jour reculé 

    console.log("Formatage de la date:", date);
    console.log("Date ISO:", new Date(date).toISOString().split("T")[0]);
    return new Date(date).toISOString().split("T")[0];
}

function DateTextField({ date, fonctionSave }: DateTextFieldProps) {

    const [tempValeur, setTempValeur] = useState<string>(formatDate(date));

    useEffect(() => {
        console.log("Date:", new Date(date).toLocaleDateString(("fr-FR"), { hour12: false }));
    }, [tempValeur]);


    return (
        <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>
            <MyTextField
                type="date"
                value={tempValeur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValeur(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        fonctionSave(tempValeur);
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
                onClick={() => { fonctionSave(tempValeur); }}

            >
                <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
            </Stack>
        </Stack>
    )
}

export default DateTextField;