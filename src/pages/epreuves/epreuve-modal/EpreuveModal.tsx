import React from "react";

import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";
import { type APIEpreuve } from "../../../contracts/epreuves";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DetailsEpreuve from "./menu-modal/MenuDetailsEpreuve";
import MenuListeEtudiants from "./menu-modal/MenuListeEtudiants";
import MenuGenererMatExam from "./menu-modal/MenuGenererMatExam";

import { useState } from "react";
import { colors, Stack } from "@mui/material";

export interface EpreuveModalProps {
    epreuve: APIEpreuve;
}

export function EpreuveModal({ epreuve }: EpreuveModalProps) {
    const { fermer } = useModal();

    const [numeroOnglet, setNumeroOnglet] = useState<0 | 1 | 2>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: 0 | 1 | 2) => {
        setNumeroOnglet(newValue);
    };

    return (

        <Modal titre={epreuve.code} onClose={fermer}>
            <Stack>
                <Stack >
                    <Tabs variant="fullWidth" value={numeroOnglet} onChange={handleChange} textColor="primary"
                        sx={{
                            width: '100%',
                            bgcolor: colors.blue[100],
                            '& .MuiTab-root': { color: colors.grey[900] },
                            '& .MuiTab-root.Mui-selected': { color: colors.blue[800] },
                            '& .MuiTab-root:hover': { color: colors.blue[800] }
                        }}>
                        <Tab label="Details" />
                        <Tab label="Liste étudiants" />
                        <Tab label="Générer matériel d'examen" />
                    </Tabs>
                </Stack>
                <Stack width={"100%"} padding={2}>
                    {numeroOnglet === 0 && <DetailsEpreuve epreuve={epreuve} />}
                    {numeroOnglet === 1 && <MenuListeEtudiants />}
                    {numeroOnglet === 2 && <MenuGenererMatExam />}
                </Stack>
            </Stack>
        </Modal>

    );
}