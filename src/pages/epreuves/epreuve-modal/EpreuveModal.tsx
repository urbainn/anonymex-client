import React from "react";

import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";
import { type APIEpreuve } from "../../../contracts/epreuves";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import DetailsEpreuve from "./MenusModal/MenuDetailsEpreuve";
import MenuListeEtudiants from "./MenusModal/MenuListeEtudiants";
import MenuGenererMatExam from "./MenusModal/MenuGenererMatExam";

import { useState } from "react";
import { Stack } from "@mui/material";

export interface EpreuveModalProps {
    epreuve: APIEpreuve;
}

export function EpreuveModal({ epreuve }: EpreuveModalProps) {
    const { fermer } = useModal();

    const [value, setValue] = useState<0 | 1 | 2>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1 | 2) => {
        setValue(newValue);
    };

    return (

        <Modal titre={epreuve.code} onClose={fermer}>
            <Stack>
                <Stack>
                    <Tabs value={value} onChange={handleChange} sx={{ width: '100%' }}>
                        <Tab label="Details" />
                        <Tab label="Liste étudiants" />
                        <Tab label="Générer matériel d'examen" />
                    </Tabs>
                </Stack>
                <Stack>
                    {value === 0 && <DetailsEpreuve epreuve={epreuve} />}
                    {value === 1 && <MenuListeEtudiants />}
                    {value === 2 && <MenuGenererMatExam />}
                </Stack>
            </Stack>
        </Modal>

    );
}