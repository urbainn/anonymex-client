import { Button, FormControl, Stack } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';



export function FormulaireSession(
    {onSubmit, children}: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; children: React.ReactNode}
) {
    return (
        <Stack component="form" onSubmit={onSubmit} spacing={2} flexDirection={'column'} gap={2}>
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
    {label, loading, disabled, endIcon, padding}: {label: string; loading?: boolean; disabled?: boolean; endIcon?: React.ReactNode; padding?: string}
) {
    return (
        <Button type="submit" variant="contained" size="medium" color="primary" endIcon={endIcon} sx={{margin: 3, borderRadius: '20px', padding: padding}} disabled={disabled || loading}  loading={loading}>
            {label}
        </Button>
    );
}

const nomSessionAutorise = [
    "Session 1 Pair",
    "Session 1 Impair",
    "Session 2 Pair",
    "Session 2 Impair",
];

export function NomSessionValide(nom: string): boolean {
    return nom !== '' && nomSessionAutorise.includes(nom);
}

export function DateSessionValide(date: string): boolean {
    const annee = Number(date);
    const anneeActuelle = new Date().getFullYear();
    return !isNaN(annee) && annee >= 2025 && annee <= anneeActuelle;
}