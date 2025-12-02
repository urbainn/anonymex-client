import { Button, Stack, Typography } from "@mui/material";
import { FormulaireSession, SessionBoutonSecondaire, SessionBoutonSubmit } from "./composantsFormulaireSession";
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
                <Typography variant="h6" textAlign={'center'}>Configuration du Bordereau</Typography>

                <Stack flexDirection="row" alignItems="center" gap={2} margin={2} justifyContent={'space-between'}>
                    <SessionBoutonSecondaire label={"Etape précédente"} onClick={onPrev} startIcon={<ArrowBackIosNewOutlined />} />
                    <SessionBoutonSubmit label="Etape suivante" endIcon={<ArrowForwardIosOutlined />} loading={isLoading}/>
                </Stack>
            </FormulaireSession>
        </Stack>
    );
}