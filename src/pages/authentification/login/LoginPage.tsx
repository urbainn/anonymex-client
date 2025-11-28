import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '../../../theme/theme';
import { getAuthInfo, loginUtilisateur } from '../../../contracts/utilisateurs';
import appColors from '../../../theme/colors';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../../../components/FormComponent';
import IconsBackgroundWrapper from '../IconsBackgroundWrapper';


export default function LoginPage() {

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
        
        const response = await loginUtilisateur({email: email, motDePasse:password});
        if (response.status === 200) {
            const estCorrect = response.data?.success;
            if (!estCorrect) {
                setLoginError('Email ou mot de passe incorrect');
            } else {
                setLoginError(null);
                navigate('/accueil');
            }
        } else {
            const errorMsg = response.error ? JSON.parse(response.error) : 'Erreur inconnue';
            setLoginError('Erreur inattendue : ' + errorMsg.error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <IconsBackgroundWrapper>

                    <FormComponent
                        title={{ text: "Anonymex", variant: "h3",  align: "center", style: { color: appColors.text.primary, fontWeight: 800 } }}
                        onSubmit={handleSubmit}
                        displayForm="flex"
                        fields={[
                            {name: "email", type: "email", value: email, onChange: setEmail},
                            {name: "password", type: "password", value: password, onChange: setPassword}
                        ]}
                        error={loginError}
                        submitButton={{
                            label: "Connexion",
                            endIcon: <ArrowForwardIcon />,
                            disabled: isLoading || !/^\S+@\S+\.\S+$/.test(email) || password.trim().length < 5,
                            display: isLoading ? 'none' : 'flex',
                        }}
                        
                        children={
                            <Button loading variant="outlined" sx={{display: isLoading ? 'flex' : 'none', borderRadius: '20px', alignSelf: "center"}} loadingPosition="end">
                                    Chargement
                            </Button>
                        }
                    />
                </IconsBackgroundWrapper>
            </ThemeProvider>
        </>
    );
}
