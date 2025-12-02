import { Input, Stack, Typography } from "@mui/material";
import { FormulaireSession, SessionBoutonSecondaire, SessionBoutonSubmit } from "./composantsFormulaireSession";
import React, { useState } from "react";
import { ArrowBackIosNewOutlined, Check } from "@mui/icons-material";


export default function SessionEtapeTeleversement({fichier,setFichier,onPrev, onValidate}: any) {

    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFichier(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!fichier) {
            setError("Veuillez sélectionner un fichier XLSX.");
            console.log(error);
            setIsLoading(false);
            return;
        }

        if (!fichier.name.endsWith('.xlsx')) {
            setError("Le fichier doit être un .xlsx");
            setIsLoading(false);
            return;
        }

        await onValidate(e);

        setIsLoading(false);
    };

    return (
        <FormulaireSession onSubmit={handleSubmit}>
            <Typography variant="body1">Veuillez téléverser un fichier XLSX ci-dessous pour finaliser la création.</Typography>

            <Input type='file' inputProps={{ accept: '.xlsx' }} onChange={handleUpload} />

            <Stack direction="row" justifyContent={'space-between'}>
                <SessionBoutonSecondaire label={"Etape précédente"} onClick={onPrev} startIcon={<ArrowBackIosNewOutlined />} />
                <SessionBoutonSubmit label="Valider la session" loading={isLoading} endIcon={<Check />} />
            </Stack>
        </FormulaireSession>
    );
}
