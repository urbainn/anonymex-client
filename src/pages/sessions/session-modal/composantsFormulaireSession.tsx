import { Button, FormControl, Stack } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';



export function FormulaireSession(
    {onSubmit, children}: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; children: React.ReactNode}
) {
    return (
        <Stack component="form" onSubmit={onSubmit} justifyContent={'space-between'} flexDirection={'column'} gap={2} margin={4}>
            {children}
        </Stack>
    );
}


export function SessionChampTexte(
    {label, value, onChange, error}: {label: string; value: string; onChange: (v: string) => void; error?: string | null}
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
            />
        </FormControl>
    );
}

export function SessionChampDate(
    {label, value, onChange, error}: {label: string; value: string; onChange: (v: string) => void; error?: string | null}
) {
    return (
        <FormControl fullWidth variant="outlined">
            <TextField
                label={label}
                type="number"
                sx={{min: new Date().getFullYear(), max: new Date().getFullYear() + 10}}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                helperText={error || ""}
            />
        </FormControl>
    );
}

export function SessionBoutonSubmit(
    {label, loading, disabled, endIcon, startIcon, padding}: {label: string; loading?: boolean; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; padding?: string}
) {
    return (
        <Button type="submit" variant="contained" size="medium" color="primary" startIcon={startIcon} endIcon={endIcon} sx={{margin: 1, padding: padding}} disabled={disabled || loading}  loading={loading}>
            {label}
        </Button>
    );
}

export function SessionBoutonSecondaire(
    {label, onClick, endIcon, startIcon, loading, disabled}: {label: string; onClick: () => void; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; loading?: boolean}
) {
    return (
        <Button variant="outlined" size="medium" color="primary" sx={{margin: 1, border: '1px solid'}} onClick={onClick} disabled={disabled || loading} startIcon={startIcon} endIcon={endIcon} loading={loading}>
            {label}
        </Button>
    );
}