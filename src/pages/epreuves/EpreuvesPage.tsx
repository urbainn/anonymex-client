import { useCallback, useEffect, useMemo, useState, useTransition, type ReactElement } from "react";
import { getEpreuves, type APIEpreuve, type APIListEpreuves } from "../../contracts/epreuves";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSnackbarGlobal } from "../../contexts/snackbar";
import { EpreuveCard } from "./EpreuveCard";
import EpreuvesFiltre from "./EpreuvesFiltre";
import { formatterDateEntiere } from "../../utils/dateUtils";

export type SortOption = "chronologique" | "inverse-chronologique";

export default function EpreuvesPage(): ReactElement {

    const [listeEpreuves, setListeEpreuves] = useState<APIListEpreuves>({ epreuvesAvenir: [], epreuvesPassees: [] });
    const [estChargement, setEstChargement] = useState(false);

    // Filtres et tri
    const [typeEpreuve, setTypeEpreuve] = useState<'passees' | 'aVenir'>('passees');
    const [filtreStatut, setFiltreStatut] = useState<number | null>(null); // null => tout afficher
    const [optionTri, setOptionTri] = useState<SortOption>("chronologique");

    // Transitions afin de fluidifier les mises à jour d'état
    const [enAttente, demarrerTransition] = useTransition();

    // Contexte de snackbar pour afficher les erreurs
    const { afficherErreur } = useSnackbarGlobal();

    // Récupérer l'id de la session depuis l'URL
    const { idSession } = useParams();

    // Charger les épreuves depuis l'API
    useEffect(() => {
        setEstChargement(true);
        async function chargerEpreuves() {
            const reponse = await getEpreuves(1);
            if (reponse.data && reponse.status === 200) {
                // Chargement réussi
                setListeEpreuves(reponse.data);
            } else {
                // Erreur lors du chargement
                afficherErreur("Impossible de charger les épreuves : " + (reponse.error ?? "Erreur inconnue"));
                setListeEpreuves({ epreuvesAvenir: [], epreuvesPassees: [] });
            }
            setEstChargement(false);
        }
        chargerEpreuves();
    }, [afficherErreur]);

    // lorsque le filtre de statut change
    const handleFiltreChange = (newStatut: number | null) => {
    };

    // calculer les épreuves à afficher selon les filtres et le tri
    const epreuvesAffichees = useMemo(() => {
        const epreuves = typeEpreuve === 'aVenir' ? listeEpreuves.epreuvesAvenir : listeEpreuves.epreuvesPassees;
        const resultat: (APIEpreuve | number)[] = [];

        let derniereDateGroupe: number = 0;
        for (let i = 0; i < epreuves.length; i++) {
            const epreuve = epreuves[i];
            const dateEntiere = Math.floor(epreuve.date / 86400000);
            if (derniereDateGroupe !== dateEntiere) {
                resultat.push(dateEntiere);
                derniereDateGroupe = dateEntiere;
            }
            if (filtreStatut === null || epreuve.statut === filtreStatut) {
                resultat.push(epreuve);
            }
        }

        // A FAIRE: gerer tri
        return resultat;
    }, [listeEpreuves, typeEpreuve, filtreStatut, /*optionTri*/]);

    return (
        <Stack direction={"row"} justifyContent={"center"}>
            <Stack sx={{ width: '75vw', paddingTop: 4 }} spacing={4} direction={"row"}
            justifyContent={"space-between"} alignItems={"flex-start"} divider={<Divider orientation="vertical" flexItem />}>
                    <Box sx={{ width: '70%'}}>
                        { /* LISTE DES ÉPREUVES */ }
                        { estChargement ? (
                            <Typography>Chargement des épreuves...</Typography>
                        ) : (
                            <Stack spacing={2}>
                                {epreuvesAffichees.map((epreuve) => (
                                    typeof epreuve === "number" ? (
                                        <Typography key={epreuve} variant="h5" paddingTop={3} fontWeight={700}>{formatterDateEntiere(epreuve)}</Typography>
                                    ) : (
                                        <EpreuveCard key={epreuve.code + epreuve.date} epreuve={epreuve} />
                                    )
                                ))}
                            </Stack>
                        )}
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        { /* FILTRES ET OPTIONS DE TRI */ }
                        <EpreuvesFiltre value={0} nombreEpreuves={epreuvesAffichees.length} selected={true} onClick={() => {}}></EpreuvesFiltre>
                    </Box>
                </Stack>
        </Stack>
    );

}
