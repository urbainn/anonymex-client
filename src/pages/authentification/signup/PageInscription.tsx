import { useState } from "react";
import { useParams } from "react-router-dom";
import FormulaireValiderEmail from "./FormulaireValiderEmail";
import IconsBackgroundWrapper from "../IconsBackgroundWrapper";
import FormulaireNouvelUtilisateur from "./FormulaireNouvelUtilisateur";

export default function PageInscription() {
    const [etape, setEtape] = useState<"email" | "final">("final");
    const [email, setEmail] = useState<string>("");
    const { jeton } = useParams();

    const handleValidateEmail = (validatedEmail: string) => {
        setEmail(validatedEmail);
        setEtape("final");
    };

    if (!jeton) {
        return (<div>Jeton d'invitation manquant. Vérifiez le lien d'invitation.</div>);
    }

    return (
        <IconsBackgroundWrapper>
            {/* Entrer email */ etape === "email" ? <FormulaireValiderEmail jeton={jeton} onValidate={handleValidateEmail} /> : null}
            {/* Infos nouvel utilisateur */ etape === "final" ? <FormulaireNouvelUtilisateur jeton={jeton} email={email} /> : null}
        </IconsBackgroundWrapper>
    );
}