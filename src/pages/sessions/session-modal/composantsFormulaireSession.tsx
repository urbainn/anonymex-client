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

export function SessionBoutonSubmit(
    {label, loading, disabled, endIcon, startIcon, padding}: {label: string; loading?: boolean; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; padding?: string}
) {
    return (
        <Button type="submit" variant="contained" size="medium" color="primary" startIcon={startIcon} endIcon={endIcon} sx={{margin: 1, borderRadius: '20px', padding: padding}} disabled={disabled || loading}  loading={loading}>
            {label}
        </Button>
    );
}

export function SessionBoutonSecondaire(
    {label, onClick, endIcon, startIcon, loading, disabled}: {label: string; onClick: () => void; disabled?: boolean; endIcon?: React.ReactNode; startIcon?: React.ReactNode; loading?: boolean}
) {
    return (
        <Button variant="outlined" size="medium" color="primary" sx={{margin: 1, borderRadius: '20px', border: '1px solid'}} onClick={onClick} disabled={disabled || loading} startIcon={startIcon} endIcon={endIcon} loading={loading}>
            {label}
        </Button>
    );
}

export function NomSessionValide(nom: string): boolean {
    return nom !== '' && nom.length >= 8;
}

export function DateSessionValide(date: string): boolean {
    const annee = Number(date);
    const anneeActuelle = new Date().getFullYear();
    return !isNaN(annee) && annee >= 2025 && annee <= anneeActuelle + 2;
}