import { FormulaireSession, SessionBoutonSubmit, SessionChampTexte, NomSessionValide, DateSessionValide } from "./composantsFormulaireSession";
import React from "react";
import { ArrowForwardIosOutlined } from "@mui/icons-material";


export default function SessionEtapeTexte({
    nomSession,
    date,
    setNomSession,
    setDate,
    onNext,
}: {
    nomSession: string,
    date: string,
    setNomSession: (v: string) => void,
    setDate: (v: string) => void,
    onNext: () => void
}) {
    const [errorNom, setErrorNom] = React.useState<string | null>(null);
    const [errorDate, setErrorDate] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorNom(null);
        setErrorDate(null);

        if (!NomSessionValide(nomSession)) {
            setErrorNom("Nom de session invalide");
            return;
        }
        if (!DateSessionValide(date)) {
            setErrorDate("Date invalide");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onNext();
        }, 300);
    };

    return (
        <FormulaireSession onSubmit={handleSubmit}>
            <SessionChampTexte label="Nom de la session" value={nomSession} onChange={setNomSession} error={errorNom}/>
            <SessionChampTexte label="Date" value={date} onChange={setDate} error={errorDate}/>
            <SessionBoutonSubmit label="Étape suivante" loading={loading} endIcon={<ArrowForwardIosOutlined />} />
        </FormulaireSession>
    );
}
