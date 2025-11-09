import React from 'react';
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Button, Paper, Stack, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '../../theme/theme';
import IconsBackgroundWrapper from './IconsBackgroundWrapper';
import { loginUtilisateur } from '../../contracts/utilisateurs';
import appColors from '../../theme/colors';


export default function LoginPage() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const response = await loginUtilisateur({email: email, motDePasse:password});
        if (response.status === 200) {
            const estCorrect = response.data?.success;
            if (!estCorrect) {
                setLoginError('Email ou mot de passe incorrect');
            } else {
                setLoginError(null);
            }
        } else {
            const errorMsg = response.error || 'Erreur inconnue';
            setLoginError('Erreur inattendue : ' + errorMsg);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <IconsBackgroundWrapper>
                    <Stack>
                        <Paper component="form" onSubmit={handleSubmit} sx={{ borderRadius: '30px', padding: '2rem', minWidth: '25vw' }}>

                            <Typography variant="h3" sx={{ color: appColors.text.primary, margin: '0 2rem 2rem 2rem', fontWeight: 800 }}>Anonymex</Typography>

                            <Stack spacing={3} direction={"column"} alignItems={"center"}>

                                <FormControl sx={{ width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type='email'
                                        label="E-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </FormControl>

                                <FormControl sx={{ width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            // Afficher/cacher le mot de passe
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPassword ? 'cacher le mot de passe' : 'afficher le mot de passe'}
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Mot de passe"
                                    />
                                </FormControl>

                                <Alert severity="error" id="login-error" sx={{width: '80%', display: loginError ? 'flex' : 'none'}}>
                                    {loginError}
                                </Alert>

                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ borderRadius: '20px' }}
                                    disabled={!/^\S+@\S+\.\S+$/.test(email) || password.trim().length < 5}
                                >
                                    Connexion
                                </Button>
                            </Stack>
                        </Paper>
                    </Stack>
                </IconsBackgroundWrapper>
            </ThemeProvider>
        </>
    );
}
