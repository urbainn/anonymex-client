
import { Stack, colors } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MyTextField from "./MyTextField";

import 'dayjs/locale/en-gb';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs"
import { de, enGB, zhCN } from 'date-fns/locale';

interface DateTextFieldProps {
    date: number;
    fonctionSave: (newVal: number) => void;
}



function DateTextField({ date, fonctionSave }: DateTextFieldProps) {

    const [tempValeur, setTempValeur] = useState<number | null>(null);

    const ref = useRef<HTMLInputElement>(null);



    useEffect(() => {
        ref.current?.focus();
    }, []);

    useEffect(() => {
        console.log("Date modifiée :", tempValeur);
    }, [tempValeur]);


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>

            <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>

                <DatePicker
                    value={tempValeur !== null ? dayjs(tempValeur) : dayjs(date)} // toujours Dayjs
                    onChange={(newValue: Dayjs | null) => { setTempValeur(newValue ? newValue.valueOf() : null); }}
                    sx={{ width: "100%" }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            variant: 'outlined',
                        },
                    }}
                />
                <Stack
                    sx={{
                        bgcolor: colors.green[100],
                        borderRadius: 100,
                        padding: 0.75,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: colors.green[200] }
                    }}
                    onClick={() => { fonctionSave(tempValeur ? tempValeur : date); }}

                >
                    <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
                </Stack>
            </Stack>
        </LocalizationProvider>
    )
}

export default DateTextField;