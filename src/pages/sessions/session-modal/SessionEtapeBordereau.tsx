import { Button, Stack, Typography } from "@mui/material";
import { FormulaireSession, SessionBoutonSubmit } from "./composantsFormulaireSession";
import React from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";


export default function SessionEtapeBordereau({bordereau,setBordereau,onPrev,onNext}: any) {
    
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        onNext();
        setIsLoading(false);
        
    }
    
    return (
        <Stack spacing={2} flexDirection={'column'} gap={2}>
            <FormulaireSession onSubmit={handleSubmit}>
                <Typography variant="h6">Bordereau en cours de développement</Typography>

                <Stack flexDirection="row" alignItems="center" gap={2}>
                    <Button sx={{label:"Etape précédente"}} endIcon={<ArrowBackIosNewOutlined />} disabled={isLoading} onClick={onPrev}>
                        Etape précédente
                    </Button>
                    <SessionBoutonSubmit label="Etape suivante" endIcon={<ArrowForwardIosOutlined />} loading={isLoading}/>
                </Stack>
            </FormulaireSession>
        </Stack>
    );
}