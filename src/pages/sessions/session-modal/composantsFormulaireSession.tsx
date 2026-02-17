import { Button, FormControl } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function SessionChampTexte(
    { label, value, onChange, error, name }: { label: string; value: string; onChange: (v: string) => void; error?: string | null; name: string }
) {
    return (
        <FormControl fullWidth variant="outlined">
            <TextField
                label={label}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                helperText={error || ""}
                name={name}
            />
        </FormControl>
    );
}

export function SessionChampDate(
    { label, value, name, onChange, error }: { label: string; value: string; name: string; onChange: (v: string) => void; error?: string | null; }
) {
    return (
        <FormControl fullWidth variant="outlined">
            <DatePicker label={label} name={name} openTo="year" views={['year']}value={value ? dayjs(`${value}-01-01`) : null} 
                onChange={(newValue: Dayjs | null) => {
                    if (newValue){
                        onChange(newValue.year().toString());
                    }
                }}
                slotProps={{
                    textField: {
                        error: !!error,
                        helperText: error || "",
                    },
                }}
                minDate={dayjs()}
            />
        </FormControl>
    );
}

export function SessionBoutonSubmit(
    { label, loading, disabled, endIcon, startIcon, padding }: { label: string; loading?: boolean; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; padding?: string }
) {
    return (
        <Button type="submit" variant="contained" size="medium" color="primary" startIcon={startIcon} endIcon={endIcon} sx={{ margin: 1, padding: padding }} disabled={disabled || loading} loading={loading}>
            {label}
        </Button>
    );
}

export function SessionBoutonPrincipal(
    { label, onClick, endIcon, startIcon, loading, disabled }: { label: string; onClick: () => void; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; loading?: boolean }
) {
    return (
        <Button variant="contained" size="medium" color="primary" sx={{ margin: 1 }} onClick={onClick} disabled={disabled || loading} startIcon={startIcon} endIcon={endIcon} loading={loading}>
            {label}
        </Button>
    );
}

export function SessionBoutonSecondaire(
    { label, onClick, endIcon, startIcon, loading, disabled }: { label: string; onClick: () => void; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; loading?: boolean }
) {
    return (
        <Button variant="outlined" size="medium" color="primary" sx={{ margin: 1, border: '1px solid' }} onClick={onClick} disabled={disabled || loading} startIcon={startIcon} endIcon={endIcon} loading={loading}>
            {label}
        </Button>
    );
}