import { Alert, Input, Stack, Typography } from "@mui/material";
import { FormulaireSession, SessionBoutonSecondaire, SessionBoutonSubmit } from "./composantsFormulaireSession";
import React, { useState } from "react";
import { ArrowBackIosNewOutlined, Check } from "@mui/icons-material";
import { URL_API_BASE } from "../../../utils/api";


export default function SessionEtapeTeleversement({fichier,setFichier,onPrev, onValidate}: any) {

    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError("Aucun fichier sélectionné.");
            setFichier(null);
            return;
        }

        const isXlsx = file.name.toLowerCase().endsWith(".xlsx");

        if (!isXlsx) {
            setError("Veuillez importer un fichier Excel (.xlsx).");
            setFichier(null);
            return;
        }

        setError(null);
        setFichier(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fichier) {
            setError("Veuillez sélectionner un fichier XLSX.");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("fichier", fichier);

            const id = 0;
            const response = await fetch(`${URL_API_BASE}/sessions/${id}/importer/`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const message = await response.text();
                setError(message || "Échec de l'envoi du fichier.");
                setIsLoading(false);
                return;
            }

            //await onValidate(e);
        } catch (err) {
            console.error("Erreur lors de l'envoi du fichier:", err);
            setError("Erreur réseau lors de l'envoi du fichier.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormulaireSession onSubmit={handleSubmit}>
            <Typography variant="body1" mb={2}>Veuillez téléverser un fichier XLSX ci-dessous pour finaliser la création.</Typography>

            <Input type='file' inputProps={{ accept: '.xlsx' }} onChange={handleUpload} />

            {fichier && (<Alert sx={{ mt: 1 }} severity="success">Fichier sélectionné : {fichier.name}</Alert>)}
            {error && <Alert sx={{ mt: 1 }}severity="error">{error}</Alert>}

            <Stack direction="row" justifyContent={'space-between'} mt={3}>
                <SessionBoutonSecondaire label={"Etape précédente"} onClick={onPrev} startIcon={<ArrowBackIosNewOutlined />} />
                <SessionBoutonSubmit label="Valider la session" loading={isLoading} endIcon={<Check />} />
            </Stack>
        </FormulaireSession>
    );
}
