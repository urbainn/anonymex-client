import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";
import { type APIEpreuve } from "../../../contracts/epreuves";

import React from "react";
import { Typography, Stack, Divider } from "@mui/material";


export interface EpreuveModalProps {
    epreuve: APIEpreuve;
}

export function EpreuveModal({ epreuve }: EpreuveModalProps) {
    const { fermer } = useModal();
    return (
        <Modal titre="Mise en situation" onClose={fermer} >
            <Stack spacing={2}>
                    <Typography variant="h6">{epreuve.nom} ({epreuve.code})</Typography>
                    <Typography>Date : {new Date(epreuve.date * 1000).toLocaleString()}</Typography>
                    <Typography>Durée : {epreuve.duree} minutes</Typography>
                    <Typography>Salles : {epreuve.salles.join(", ")}</Typography>
                    <Typography>Statut : {epreuve.statut}</Typography>
                </Stack>
                
                <Divider sx={{ my: 2 }} />
                
                <Stack spacing={2}>
                </Stack>
        </Modal>
    );
}