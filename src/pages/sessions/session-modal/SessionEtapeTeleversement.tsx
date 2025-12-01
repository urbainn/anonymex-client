import { Button, Stack, Typography } from "@mui/material";
import { FormulaireSession, SessionBoutonSubmit } from "./composantsFormulaireSession";
import React, { useState } from "react";


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

        // Validation du fichier
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
            <Typography>Téléversement XLSX</Typography>

            <input type="file" accept=".xlsx" onChange={handleUpload} />

            <Stack direction="row" gap={2}>
                <Button type='button' variant="outlined" sx = {{label:"Précédent"}} onClick={onPrev}>
                    Précédent
                </Button>
                <SessionBoutonSubmit label="Valider la session" loading={isLoading}/>
            </Stack>
        </FormulaireSession>
    );
}
