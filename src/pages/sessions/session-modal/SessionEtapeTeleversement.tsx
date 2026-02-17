import { Alert, Input, Stack, Typography } from "@mui/material";
import { SessionBoutonSecondaire, SessionBoutonSubmit } from "./composantsFormulaireSession";
import React, { useState } from "react";
import { ArrowBackIosNewOutlined, Check } from "@mui/icons-material";

type Props = {
    fichier: File | null;
    setFichier: (f: File | null) => void;
    onPrev: () => void;
    onValidate: () => Promise<void>;
};

export default function SessionEtapeTeleversement({fichier,setFichier,onPrev, onValidate}: Props) {

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fichier) {
            setError("Veuillez sélectionner un fichier XLSX.");
            return;
        }

        setIsLoading(true);
        await onValidate();
        setIsLoading(false);
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} justifyContent={'space-between'} flexDirection={'column'} gap={2} margin={4}>
            <Typography variant="body1" mb={2}>Veuillez téléverser un fichier XLSX ci-dessous pour finaliser la création.</Typography>

            <Input type='file' inputProps={{ accept: '.xlsx' }} onChange={handleUpload} />

            {error && <Alert sx={{ mt: 1 }}severity="error">{error}</Alert>}

            <Stack direction="row" justifyContent={'space-between'} mt={3}>
                <SessionBoutonSecondaire label={"Etape précédente"} onClick={onPrev} startIcon={<ArrowBackIosNewOutlined />} />
                <SessionBoutonSubmit label="Créer" loading={isLoading} endIcon={<Check />} />
            </Stack>
        </Stack>
    );
}
