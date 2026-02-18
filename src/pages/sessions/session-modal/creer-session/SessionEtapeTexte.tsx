import { SessionModalBouton, SessionChampDate, SessionChampTexte } from "../composantsFormulaireSession";
import React from "react";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";

type Props = {
    nomSession: string;
    date: string;
    setNomSession: (v: string) => void;
    setDate: (v: string) => void;
    onNext: () => void;
};

export default function SessionEtapeTexte({nomSession, date, setNomSession, setDate, onNext}: Props) {

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

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onNext();
        }, 300);
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} justifyContent={'space-between'} flexDirection={'column'} gap={2} margin={4}>

            <SessionChampTexte label="Nom de la session" name="nom" onChange={setNomSession} error={errorNom} value={nomSession}/>
            <SessionChampDate label="Année" onChange={setDate} error={errorDate} value={date} name={"annee"}/>
            <SessionModalBouton label="Étape suivante" loading={loading} endIcon={<ArrowForwardIosOutlined />} disabled={nomSession.length < 1 || date.length < 1}/>

        </Stack>
    );
}
