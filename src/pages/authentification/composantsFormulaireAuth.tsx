/**
 * Ensemble des composants pour les formulaires d'authentification.
 */

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

/**
 * Wrapper pour les formulaires d'authentification.
 */
export function AuthFormulaire(
    { onSubmit, children }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; children: React.ReactNode }
) {
    return (
        <Paper sx={{ borderRadius: 4, width: 'clamp(400px, 50vw, 600px)' }}>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </Paper>
    );
}

/**
 * Mise en page classique, avec entête pour les formulaires d'authentification.
 */
export function AuthFormCorps(
    { title, description, children }: { title: string; description?: string; children: React.ReactNode }
) {
    return (
        <Box padding={5}>
            <Typography variant="h4" fontWeight={600}>{title}</Typography>
            {description && <Typography variant="body1" mt={1} color="textSecondary">{description}</Typography>}
            <Stack marginTop={4} spacing={2}>
                {children}
            </Stack>
        </Box>
    );
}

/**
 * Champ email, avec validation.
 */
export function AuthChampEmail(
    { value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string | null }
) {
    return (
        <FormControl fullWidth variant="outlined">
            <TextField
                label="Email"
                type="email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                helperText={error || ""}
            />
        </FormControl>
    );
}

/**
 * Bouton de validation, avec état de chargement.
 */
export function AuthBoutonValidation(
    { label, loading, disabled, padding }: { label: string; loading: boolean; disabled?: boolean; padding?: string }
) {
    return (
        <Box>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={disabled || loading} loading={loading} size="large" sx={{ padding }}>
                {label}
            </Button>
        </Box>
    );
}

/**
 * Champ mot de passe (avec option d'affichage du mot de passe).
 */
export function AuthChampMotDePasse(
    { value, onChange, error, label }: { value: string; onChange: (v: string) => void; error?: string | null; label?: string }
) {
    const [afficherMdp, setAfficherMdp] = useState<boolean>(false);

    return (
        <FormControl fullWidth variant="outlined">
            <TextField
                label={label ?? "Mot de passe"}
                type={afficherMdp ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                helperText={error || ""}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton onClick={() => setAfficherMdp(!afficherMdp)}>
                                {afficherMdp ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        )
                    }
                }}
            />
        </FormControl>
    );
}
