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
    { onSubmit, type = 'signup', children }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; type?: 'login' | 'signup'; children: React.ReactNode }
) {
    return (
        <Paper sx={{ borderRadius: 4, width: type === 'login' ? 'clamp(300px, 40vw, 500px)' : 'clamp(400px, 50vw, 600px)'}}>
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
    { title, description, type = 'signup', children }: { title: string; description?: string; children: React.ReactNode; type?: 'login' | 'signup' }
) {
    return (
        <Box padding={5} textAlign={type === 'login' ? "center" : undefined}>
            <Typography variant={type === 'signup' ? "h4" : "h3"} fontWeight={type === 'signup' ? 600 : 900}>{title}</Typography>
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
    { label, loading, disabled, padding, type }: { label: string; loading: boolean; disabled?: boolean; padding?: string; type?: 'login' | 'signup' }
) {
    return (
        <Box sx={type === 'login' ? {display: 'flex', justifyContent: 'center', paddingBottom: 2} : undefined}>
            <Button type="submit" variant="contained" color="primary" disabled={disabled || loading} loading={loading} size="large" sx={{ padding, borderRadius: 20, alignSelf: 'center'}}>
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
