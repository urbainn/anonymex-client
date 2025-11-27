

import { Stack, TextField } from "@mui/material";
import React from "react";
import { TypoSousTitre } from "../TypoSousTitre";
import { TypoTitre } from "../TypoTitre";
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

interface EpreuveCaracteristiqueProps {
    titre: string;
    sousTitre?: string;
    fonction: () => void;
    fonctionSave: (newVal: string) => void;
    modif: boolean;
    type: string;
}

export const EpreuveCaracteristique = ({ titre, sousTitre, fonction, fonctionSave, modif, type }: EpreuveCaracteristiqueProps) => {

    const [tempValeur, setTempValeur] = React.useState<string>(sousTitre ? sousTitre : "");

    return (
        <Stack direction="column" >
            <TypoTitre>{titre}</TypoTitre>

            <Stack direction="row" spacing={3} alignItems="center" justifyContent={"space-between"} width={"100%"}>
                {modif == false && (
                    <>
                        {sousTitre ? (
                            <TypoSousTitre>{sousTitre}</TypoSousTitre>
                        ) : (
                            <TypoSousTitre sx={{ color: "red" }}>
                                Pas de données
                            </TypoSousTitre>
                        )}

                        <Stack
                            sx={{
                                bgcolor: colors.blue[100],
                                borderRadius: 100,
                                padding: 0.75,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: colors.blue[200] }
                            }}
                            onClick={fonction}
                        >
                            <EditIcon fontSize="small" sx={{ color: "grey.700" }} />
                        </Stack>
                    </>
                )}
                {modif == true && (
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent={"space-between"}>
                        <TextField
                            type={type}
                            value={tempValeur}
                            onChange={(e) => setTempValeur(e.target.value)}
                            size="small"
                            variant="outlined"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fonctionSave(tempValeur);
                                }
                            }}
                        />
                        <Stack
                            sx={{
                                bgcolor: colors.green[100],
                                borderRadius: 100,
                                padding: 0.75,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: colors.green[200] }
                            }}
                            onClick={() => { fonctionSave(tempValeur); }}

                        >
                            <CheckIcon fontSize="small" sx={{ color: "grey.700" }} />
                        </Stack>
                    </Stack>
                )}


            </Stack>
        </Stack>


    );
}