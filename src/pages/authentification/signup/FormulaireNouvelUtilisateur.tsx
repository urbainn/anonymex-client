import { Alert, Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { AuthBoutonValidation, AuthChampMotDePasse, AuthFormCorps, AuthFormulaire } from "../composantsFormulaireAuth";
import { creerUtilisateur } from "../../../contracts/utilisateurs";
import { useNavigate } from "react-router-dom";

export default function FormulaireNouvelUtilisateur({ jeton, email }: { jeton: string; email: string }) {
    const [prenom, setPrenom] = useState<string>('');
    const [nom, setNom] = useState<string>('');

    const [mdp, setMdp] = useState<string>('');
    const [mdpConfirm, setMdpConfirm] = useState<string>('');
    const [mdpCorrespondent, setMdpCorrespondent] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Envoi du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (mdp !== mdpConfirm) {
            setMdpCorrespondent(false);
            return;
        }

        if (!mdp || mdp.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        if (!prenom || !nom) {
            setError('Merci de remplir tous les champs.');
            return;
        }

        const response = await creerUtilisateur({
            jetonInvitation: jeton,
            email,
            prenom,
            nom,
            motDePasse: mdp
        })
        if (!response.data || response.status !== 200) setError(response.error || 'Erreur inconnue');
        else if (response.data.success) navigate('/acceuil');
        else setError('Création du compte refusée. Vérifiez les informations fournies.');

    };

    const handleSetMdpConfirm = (v: string) => {
        setMdpConfirm(v);
        setMdpCorrespondent(true);
    };

    return (
        <AuthFormulaire onSubmit={handleSubmit}>
            <AuthFormCorps
                title="Finalisez votre inscription"
                description="Veuillez renseigner votre nom, prénom et un mot de passe afin d'activer votre compte. Le mot de passe doit contenir au moins 8 caractères."
            >

                <Stack spacing={2} direction={"row"}>
                    <TextField fullWidth label="Prénom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    <TextField fullWidth label="Nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </Stack>

                <Box />
                <AuthChampMotDePasse value={mdp} onChange={setMdp} error={mdp.length > 0 && mdp.length < 8 ? "Le mot de passe doit faire au moins 8 caractères." : null} />
                <AuthChampMotDePasse value={mdpConfirm} onChange={handleSetMdpConfirm} error={!mdpCorrespondent ? "Les mots de passe ne correspondent pas." : null} label="Confirmez le mot de passe" />

                <Box />
                
                <AuthBoutonValidation disabled={mdp.length < 8 || mdpConfirm.length < 8 || !prenom || !nom} label="Valider" loading={false} padding="0.9rem 1.5rem"/>

                {error && <Alert severity="error">{error}</Alert>}
            </AuthFormCorps>
        </AuthFormulaire>
    );
}