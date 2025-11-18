import { ThemeProvider} from '@mui/material';
import React from 'react';
import IconsBackgroundWrapper from '../login/IconsBackgroundWrapper';
import theme from '../../theme/theme';
import { creerUtilisateur, getInvitationInfo } from '../../contracts/utilisateurs';
import { useParams } from 'react-router-dom';
import FormComponent from '../../components/FormComponent';


export default function SignUpPage() {

    const [name, setName] = React.useState<string>('');
    const [firstName, setFirstName] = React.useState<string>('');

    const [email, setEmail] = React.useState<string>('');
    const [emailValid, setEmailValid] = React.useState<boolean>(false);

    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');

    const [error, setError] = React.useState<string | null>(null);

    const jetonInvitation = useParams();
    const jeton = jetonInvitation.jeton || '';


    const emailSubmitting = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^\S+@\S+\.\S+$/;

        const emailRegexValid = emailRegex.test(email);

        if (!emailRegexValid) {
            setError("L'adresse e-mail n'est pas valide.");
            setEmailValid(false);
            return;
        }

        const response = await getInvitationInfo(jeton, email);

        if (response.status === 200) {
            const estCorrect = response.data?.success;
            if (!estCorrect) {
                setError("L'adresse e-mail ne correspond pas à celle de l'invitation.");
                setEmailValid(false);
            } else {
                setError(null);
                setEmailValid(true);
            }
        } else {
            const errorMsg = response.error || 'Erreur inconnue';
            setError('Erreur inattendue : ' + errorMsg);
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

        if (jeton === 'setup') {
            const emailSetupValid = email.trim() !== '' && /^\S+@\S+\.\S+$/.test(email);
            if (!emailSetupValid) {
                setError("L'adresse e-mail n'est pas valide.");
                return;
            }
            else {
                setEmailValid(true);
            }
        }

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

        if (emailValid) {
            creerUtilisateur({
                jetonInvitation: jeton,
                email: email,
                nom: name,
                prenom: firstName,
                motDePasse: password
            });
            console.log("Utilisateur créé avec succès !");
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <IconsBackgroundWrapper>
                    {/* Formulaire de première inscription */}
                    <FormComponent
                        display={jeton === 'setup' ? 'flex' : 'none'}
                        title="Bienvenue"
                        description="Veuillez renseigner votre nom, prénom, email et un mot de passe pour finaliser votre inscription."
                        error={error}
                        onSubmit={finalSubmit}
                        fields={[
                            { name: "lastname", type: "lastname", value: name, onChange: setName, required: true },
                            { name: "firstname", type: "firstname", value: firstName, onChange: setFirstName, required: true },
                            { name: "email", type: "email", value: email, onChange: setEmail, required: true },
                            { name: "password", type: "password", value: password, onChange: setPassword, required: true },
                            { name: "passwordConfirm", type: "password-confirm", value: passwordConfirm, onChange: setPasswordConfirm, required: true }
                        ]}
                    />

                    {/* Formulaire d'invitation confirmation email*/}
                    <FormComponent
                        display={jeton === 'setup' ? 'none' : emailValid ? 'none' : 'flex'}
                        title="Inscription"
                        description="Saisissez l'adresse e-mail indiquée par l'administrateur lors de la création de votre lien d'invitation. Elle doit correspondre exactement."
                        error={error}
                        onSubmit={emailSubmitting}
                        fields={[
                            { name: "email", type: "email", value: email, onChange: setEmail, placeholder: "prenom.nom@etablissement.fr"},
                        ]}
                    />

                    {/* Formulaire final d'inscription après validation de l'email */}
                    <FormComponent
                        display={jeton === 'setup' ? 'none' : emailValid ? 'flex' : 'none'}
                        title="Finalisez votre inscription"
                        description="Veuillez renseigner votre nom, prénom et un mot de passe afin d'activer votre compte. Le mot de passe doit contenir au moins 8 caractères."
                        error={error}
                        onSubmit={finalSubmit}
                        fields={[
                            { name: "lastname", type: "lastname", value: name, onChange: setName },
                            { name: "firstname", type: "firstname", value: firstName, onChange: setFirstName },
                            { name: "password", type: "password", value: password, onChange: setPassword },
                            { name: "passwordConfirm", type: "password-confirm", value: passwordConfirm, onChange: setPasswordConfirm }
                        ]}
                    />
                </IconsBackgroundWrapper>
            </ThemeProvider>
        </>
    );
}