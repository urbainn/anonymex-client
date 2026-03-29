import React, { useEffect } from "react";

import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";
import { type APIEpreuve } from "../../../contracts/epreuves";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DetailsEpreuve from "./menu-modal/MenuDetailsEpreuve";
import MenuListeEtudiants from "./menu-modal/MenuListeEtudiants";
import MenuGenererMatExam from "./menu-modal/MenuGenererMatExam";
import { IncidentsComplets } from "./menu-modal/composantsIncidents/IncidentsComplets";

import { useState } from "react";
import { colors, Stack } from "@mui/material";

import { themeEpreuves } from "../../../theme/epreuves";
import { MenuScanCopies } from "./menu-modal/MenuScanCopies";
import { BrowserRouter } from "react-router-dom";
import MenuPresence from "./menu-modal/MenuPresence";


export interface EpreuveModalProps {
    epreuve: APIEpreuve;
    sessionId: string;
    tab?: string | null;
    nbIncidents?: number;
}

export function EpreuveModal({ epreuve, sessionId, tab, nbIncidents }: EpreuveModalProps) {
    const { fermer } = useModal();

    const [numeroOnglet, setNumeroOnglet] = useState<0 | 1 | 2 | 3 | 4>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: 0 | 1 | 2 | 3 | 4) => {
        setNumeroOnglet(newValue);
    };

    const tabs = [
        {
            label: "Details",
            content: <DetailsEpreuve epreuve={epreuve} />
        },
        {
            label: "Liste étudiants",
            content: (
                <MenuListeEtudiants
                    codeEpreuve={epreuve.code}
                    idSession={epreuve.session}
                    statut={epreuve.statut}
                    menuColor={epreuve.statut == 1 ? undefined : themeEpreuves.status[epreuve.statut]}
                />
            )
        },

        ...(epreuve.statut <= 2 ? [{
            label: "Générer matériel d'examen",
            content: <MenuGenererMatExam menuColor={themeEpreuves.status[epreuve.statut]} idSession={sessionId} codeEpreuve={epreuve.code} />
        }] : []),

        ...(epreuve.statut === 3 ? [{
            label: "Scanner copies",
            content: <MenuScanCopies codeUE={epreuve.code} idSession={sessionId} menuColor={themeEpreuves.status[epreuve.statut]} />
        }] : []),

        ...(epreuve.statut >= 4 ? [{
            label: "Exporter les notes",
            content: <MenuScanCopies codeUE={epreuve.code} idSession={sessionId} menuColor={themeEpreuves.status[epreuve.statut]} exportMode />
        }] : []),

        {
            label: "Présence",
            content: <MenuPresence epreuve={epreuve} />
        },

        ...(epreuve.statut >= 3 && nbIncidents !== undefined && nbIncidents > 0 ? [{
            label: `Incidents (${nbIncidents})`,
            content: <IncidentsComplets idSession={Number(sessionId)} epreuveCode={epreuve.code} />
        }] : [])
    ];

    return (
        <BrowserRouter>
            <Modal titre={epreuve.code} onClose={() => { fermer(); }} width="1200px" height="650px" newbgcolor={themeEpreuves.status[epreuve.statut] + '4F'} idSession={sessionId}>
                <Stack>
                    <Stack >
                        <Tabs
                            variant="fullWidth"
                            value={numeroOnglet}
                            onChange={handleChange}
                            textColor="primary"
                            sx={{
                                width: '100%',
                                bgcolor: themeEpreuves.status[epreuve.statut] + '4F',
                                '& .MuiTab-root': { color: colors.grey[800] },
                                '& .MuiTab-root.Mui-selected': { color: colors.grey[900] },
                                '& .MuiTab-root:hover': { backgroundColor: themeEpreuves.status[epreuve.statut] + '20' },
                                '& .MuiTabs-indicator': { backgroundColor: themeEpreuves.status[epreuve.statut] + 'FF' }
                            }}
                        >
                            {tabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} />
                            ))}
                        </Tabs>
                    </Stack>
                    <Stack padding={2}>
                        {tabs[numeroOnglet]?.content}
                    </Stack>
                </Stack>
            </Modal >
        </BrowserRouter>

    );
}