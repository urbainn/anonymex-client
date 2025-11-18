import { useEffect, useMemo, useState, useTransition, type ReactElement } from "react";
import { getEpreuves, type APIEpreuve, type APIListEpreuves } from "../../contracts/epreuves";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useSnackbarGlobal } from "../../contexts/snackbar";
import { EpreuveCard } from "./EpreuveCard";
import { formatterDateEntiere } from "../../utils/dateUtils";
import SearchBar from "../../components/SearchBar";
import EpreuvesFiltreCard from "./EpreuvesFiltreCard";
import { blue, purple } from "@mui/material/colors";

export type SortOption = "chronologique" | "inverse-chronologique";

export default function EpreuvesPage(): ReactElement {

    const [listeEpreuves, setListeEpreuves] = useState<APIListEpreuves>({ epreuvesAvenir: [], epreuvesPassees: [] });
    const [estChargement, setEstChargement] = useState(false);

    // Filtres et tri
        const [typeEpreuve, setTypeEpreuve] = useState<'passees' | 'aVenir'>('aVenir');
        const [filtreStatut] = useState<number | null>(null); // null => tout afficher
        const [optionTri] = useState<SortOption>("chronologique");

    // Transitions afin de fluidifier les mises à jour d'état
        const [, demarrerTransition] = useTransition();

    // Contexte de snackbar pour afficher les erreurs
    const { afficherErreur } = useSnackbarGlobal();

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


    // lorsque le filtre de type d'épreuve change
    const handleTypeEpreuveChange = (newType: 'passees' | 'aVenir') => {
        demarrerTransition(() => {
            setTypeEpreuve(newType);
        });
    };

    // calculer les épreuves à afficher selon les filtres et le tri
    const epreuvesAffichees = useMemo(() => {
        const epreuvesSource = typeEpreuve === 'aVenir' ? listeEpreuves.epreuvesAvenir : listeEpreuves.epreuvesPassees;

        const epreuvesFiltres = epreuvesSource.filter((epreuve) => {
            if (filtreStatut !== null && epreuve.statut !== filtreStatut) {
                return false;
            }
            return true;
        });

        const triSens = optionTri === 'chronologique' ? 1 : -1;
        const epreuvesTriees = [...epreuvesFiltres].sort((a, b) => (a.date - b.date) * triSens);

        const resultat: (APIEpreuve | number)[] = [];
        let derniereDateGroupe: number | null = null;

        for (let i = 0; i < epreuvesTriees.length; i++) {
            const epreuve = epreuvesTriees[i];
            const dateEntiere = Math.floor(epreuve.date / 86400000);

            if (derniereDateGroupe !== dateEntiere) {
                resultat.push(dateEntiere);
                derniereDateGroupe = dateEntiere;
            }

            resultat.push(epreuve);
        }

        return resultat;
    }, [listeEpreuves, typeEpreuve, filtreStatut, optionTri]);

    return (
        <Box p={3}>
            <SearchBar setNewSearchTerm={() => {}} backToSessions={true} setBackToSessions={() => {}}/>

            { /* Page séparée en deux colonnes : liste des épreuves à gauche, filtres et options de tri à droite */ }
            <Stack direction={"row"} justifyContent={"center"}>
                <Stack sx={{ width: '85vw', paddingTop: 4 }} spacing={4} direction={"row"}
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
                            <Stack spacing={2}>
                                <Typography variant="h5" paddingTop={3} fontWeight={700}>Filtres</Typography>
                                <EpreuvesFiltreCard couleur={purple[300]} titre="Épreuves à venir" nombre={listeEpreuves.epreuvesAvenir.length} selected={typeEpreuve === 'aVenir'} onClick={() => handleTypeEpreuveChange('aVenir')} />
                                <EpreuvesFiltreCard couleur={blue[300]} titre="Épreuves passées" nombre={listeEpreuves.epreuvesPassees.length} selected={typeEpreuve === 'passees'} onClick={() => handleTypeEpreuveChange('passees')} />
                            </Stack>
                        </Box>
                    </Stack>
            </Stack>
        </Box>
    );

}
