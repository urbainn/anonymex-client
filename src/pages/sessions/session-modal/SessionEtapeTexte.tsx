import { FormulaireSession, SessionBoutonSubmit, SessionChampTexte, SessionChampDate } from "./composantsFormulaireSession";
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

        if(nomSession.length < 1) {
            setErrorNom("Le nom de la session doit contenir au moins 1 caractère.");
            return;
        }

        if(date < new Date().getFullYear().toString()) {
            setErrorDate(`L'année doit être supérieure à ${new Date().getFullYear() - 1}.`);
            return;
        }

        if(date > (new Date().getFullYear() + 10).toString()) {
            setErrorDate(`L'année doit être inférieure à ${new Date().getFullYear() + 11}.`);
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
            <SessionChampDate label="Année" value={date} onChange={setDate} error={errorDate}/>
            <SessionBoutonSubmit label="Étape suivante" loading={loading} endIcon={<ArrowForwardIosOutlined />} />
        </FormulaireSession>
    );
}
