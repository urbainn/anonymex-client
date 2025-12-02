import { useNavigate } from "react-router-dom";
import { getAuthInfo, loginUtilisateur } from '../../../contracts/utilisateurs';
import React, { useState } from 'react';
import { AuthBoutonValidation, AuthChampEmail, AuthChampMotDePasse, AuthFormCorps, AuthFormulaire } from "../composantsFormulaireAuth";
import { Alert, Box, Stack, Typography } from "@mui/material";
import IconsBackgroundWrapper from "../IconsBackgroundWrapper";

export default function PageConnexion() {

    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const infoAuth = await getAuthInfo();
            if (infoAuth.data && infoAuth.data.premiereConnexion === true) {
                navigate("/invitation/setup");
            }
        })();

    }, [navigate]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setLoginError(null);

        const response = await loginUtilisateur({ email: email, motDePasse: password });
        if (response.status === 200) {
            const estCorrect = response.data?.success;
            if (!estCorrect) {
                setLoginError('Email ou mot de passe incorrect');
            } else {
                setLoginError(null);
                navigate('/accueil');
            }
        } else {
            const errorMsg = response.error || 'Erreur inconnue';
            setLoginError('Erreur inattendue : ' + errorMsg);
        }
        setIsLoading(false);
    };

    return (
        <>
            <IconsBackgroundWrapper>
                <AuthFormulaire onSubmit={handleSubmit} type="login">

                    <Box padding={5} textAlign={"center"}>

                        <Typography variant={"h3"} fontWeight={900}>Anonymex</Typography>
                        
                        <Stack marginTop={4} spacing={2}>
                        <Stack spacing={2}>
                            <AuthChampEmail value={email} onChange={setEmail} error={email.length > 0 && !(/^\S+@\S+\.\S+$/).test(email) ? "Adresse e-mail invalide." : null} />
                            <AuthChampMotDePasse value={password} onChange={setPassword} error={password.length > 0 && password.length < 8 ? "Le mot de passe doit faire au moins 8 caractères." : null} />
                        </Stack>

                        {loginError && <Alert severity="error">{loginError}</Alert>}

                        <AuthBoutonValidation label="Se connecter" loading={isLoading} disabled={isLoading}/>
                        </Stack>
                    </Box>

                </AuthFormulaire>
            </IconsBackgroundWrapper>
        </>
    );
}