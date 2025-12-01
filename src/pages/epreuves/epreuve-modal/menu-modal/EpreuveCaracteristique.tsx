

import { Stack } from "@mui/material";
import { useEffect, type JSX } from "react";
import { TypoSousTitre } from "../TypoSousTitre";
import { TypoTitre } from "../TypoTitre";
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "@mui/material";

interface EpreuveCaracteristiqueProps {
    titre: string;
    sousTitre?: string;
    fonctionModif: () => void;
    modif: boolean;
    AdaptedTextField?: (props: any) => JSX.Element;
}


export const EpreuveCaracteristique = ({ titre, sousTitre, fonctionModif, modif, AdaptedTextField }: EpreuveCaracteristiqueProps) => {


    useEffect(() => {
        console.log("sousTitre modifié :", sousTitre);
    }, [sousTitre]);


    return (
        <Stack direction="column" >
            <TypoTitre>{titre}</TypoTitre>

            <Stack direction="row" spacing={1} alignItems="center" justifyContent={"space-between"} width={"100%"} height={35}>
                {modif == false && (
                    <>
                        {sousTitre ? (
                            <TypoSousTitre>{sousTitre}</TypoSousTitre>
                        ) : (
                            <TypoSousTitre sx={{ color: "red" }}>
                                Pas de données
                            </TypoSousTitre>
                        )}

                        {/* Si le composant ne reçoit pas de TextField alors pas de modifs possible*/}

                        {AdaptedTextField && (
                            <Stack
                                sx={{
                                    bgcolor: colors.blue[100],
                                    borderRadius: 100,
                                    padding: 0.75,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: colors.blue[200] }
                                }}
                                onClick={fonctionModif}
                            >
                                <EditIcon fontSize="small" sx={{ color: "grey.700" }} />
                            </Stack>
                        )}
                    </>
                )}

                {/* Quand bouton modif activé, affichage du composant TextField adapté*/}

                {modif == true && (
                    <>
                        {AdaptedTextField && (
                            <AdaptedTextField />
                        )}
                    </>

                )}


            </Stack>
        </Stack>


    );
}