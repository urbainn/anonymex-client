import {Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import IconsBackgroundWrapper from '../login/IconsBackgroundWrapper';
import theme from '../../theme/theme';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function SignUpPage() {

    const [name, setName] = React.useState<string>('');
    const [firstName, setFirstName] = React.useState<string>('');

    const [email, setEmail] = React.useState<string>('');
    const [emailValid, setEmailValid] = React.useState<boolean>(false);

    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');

    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
    };

    const [error, setError] = React.useState<string | null>(null);


    const emailSubmitting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^\S+@\S+\.\S+$/;

        const emailRegexValid = emailRegex.test(email);

        setEmailValid(emailRegexValid);

        if (emailRegexValid) {
            const emailFromInvitation = "test@gmail.com";

            if (email !== emailFromInvitation) {
                setError("L'adresse e-mail ne correspond pas à celle de l'invitation.");
                setEmailValid(false);
            }
            else {
                setError(null);
            }
        }
    }

    const { passwordsAreMatching, passwordLengthValid, nameFilled, firstNameFilled } = React.useMemo(() => {
        const passwordsAreMatching = password === passwordConfirm;
        const passwordLengthValid = password.length >= 8;
        const nameFilled = name.trim() !== '';
        const firstNameFilled = firstName.trim() !== '';
        return { passwordsAreMatching, passwordLengthValid, nameFilled, firstNameFilled };
    }, [password, passwordConfirm, name, firstName]);

    const finalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        if (!passwordsAreMatching) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (!passwordLengthValid) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (!nameFilled || !firstNameFilled) {
            setError("Le nom et le prénom sont requis.");
            return;
        }

        if (emailValid && passwordsAreMatching && passwordLengthValid && nameFilled && firstNameFilled) {
            console.log("Inscription réussie !");
            setError(null);
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <IconsBackgroundWrapper>

                    {/* Étape 1 : confirmation de l'email */}
                    <Stack display={emailValid ? 'none' : 'flex'}>
                        <Paper component="form" onSubmit={emailSubmitting} elevation={3} sx={{ padding: 4, borderRadius: 5, maxWidth: 600 }}>
                            <Stack spacing={2}>
                                <Typography variant="h4" component="h1" gutterBottom textAlign="justify">
                                    Inscription
                                </Typography>

                                <Typography variant="body1" gutterBottom textAlign="justify">
                                    Saisissez l'adresse e-mail indiquée par l'administrateur lors de la création de votre lien d'invitation. 
                                    Elle doit correspondre exactement.
                                </Typography>
                                <Stack direction={'row'} alignItems={"center"} spacing={2} justifyContent={"space-between"}>
                                    <FormControl sx={{ width: '75%' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email"
                                            type='email'
                                            label="E-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='prenom.nom@etablissement.fr'
                                            required
                                        />
                                    </FormControl>

                                    <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px', marginTop: 2, alignSelf: 'center' }} disabled={!/^\S+@\S+\.\S+$/.test(email)}>
                                        Valider 
                                    </Button>
                                </Stack>

                                <Alert severity="error" id="login-error" sx={{width: '100%', display: error ? 'flex' : 'none'}}>
                                    {error}
                                </Alert>
                            </Stack>
                        </Paper>
                    </Stack>

                    {/* Étape 2 : finalisation de l'inscription */}
                    <Stack display={emailValid ? 'flex' : 'none'}>
                        <Paper component="form" onSubmit={finalSubmit} elevation={3} sx={{ padding: 4, borderRadius: 5, maxWidth: 600 }}>
                            <Stack spacing={2}>
                                <Typography variant="h4" component="h1" gutterBottom textAlign="justify">
                                    Finalisez votre inscription
                                </Typography>

                                <Typography variant="body1" gutterBottom textAlign="justify">
                                    Veuillez renseigner votre nom, prénom et un mot de passe afin d'activer votre compte. 
                                    Le mot de passe doit contenir au moins 8 caractères.
                                </Typography>
                                <Stack direction={'column'} alignItems={"center"} gap={2} justifyContent={"space-between"}>

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-name">Nom</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-name"
                                            type='text'
                                            label='Nom'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-firstname">Prénom</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-firstname"
                                            type='text'
                                            label='Prénom'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}

                                        />
                                    </FormControl>
                                    
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                        <OutlinedInput
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
                                            label="Mot de passe"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password-confirm">Confirmez votre mot de passe</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-confirm"
                                            type='password'
                                            label="Confirmez votre mot de passe"
                                            value={passwordConfirm}
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                            required
                                        />
                                    </FormControl>

                                    <Alert severity="error" id="login-error" sx={{width: '100%', display: error ? 'flex' : 'none'}}>
                                        {error}
                                    </Alert>

                                    <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px', marginTop: 2, alignSelf: 'center' }}>
                                        Valider 
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </IconsBackgroundWrapper>
            </ThemeProvider>
        </>
    );
}