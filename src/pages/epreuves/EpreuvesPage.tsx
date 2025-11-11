import { type ReactElement, useState, useEffect, useRef, use } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  type APIEpreuve,
  getEpreuves
} from "../../contracts/epreuves";

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


import { EpreuveCard } from "../epreuves/EpreuveCard";
import EpreuvesFiltres from "../epreuves/EpreuvesFiltres";

function formatDate(value: Date | string): string {
  const dateValue = typeof value === "string" ? new Date(value) : value;
  return dateValue.toLocaleString();
}


function EpreuvesPage(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [epreuves, setEpreuves] = useState<APIEpreuve[]>([]);
  const [listeDateEpreuves, setListeDateEpreuves] = useState<Date[]>([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({ 0: true, 1: false, 2: false, 3: false, 4: false, 5: false });
  const [numbers, setNumbers] = useState<NumbersValue[]>([0, 1, 2, 3, 4, 5]);


  function selectedValue(): NumbersValue {
    for (const key in selected) {
      if (selected[key as unknown as number]) {
        console.log("Valeur sélectionnée :", key);
        return Number(key) as NumbersValue;
      }
    }
    return 0 as NumbersValue;
  }

  // 0 : Selection de toutes les épreuves
  type NumbersValue = 0 | 1 | 2 | 3 | 4 | 5;


  useEffect(() => {
    console.log("Valeur sélectionnée (useEffect) :", selectedValue());
  }, [selected]);

  

  useEffect(() => {
    // Trier les épreuves par date croissante
    epreuves.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    console.log("Épreuves triées :", epreuves);

    // Créer la liste des dates d'épreuves uniques
    const listeDates: Date[] = [];
    epreuves.forEach((epreuve) => {
      const epreuveDate = new Date(epreuve.date);
      const existeDeja = listeDates.some((date) => memeDate(date, epreuveDate)); // ✅ ici

      if (!existeDeja) {
        listeDates.push(epreuveDate);
      }
    });

    setListeDateEpreuves(listeDates);
    console.log("Liste des dates d'épreuves :", listeDates);

  }, [epreuves]);


  // Charger et afficher les épreuves
  const handleChargerEpreuves = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    // attendre 2 secondes (voir le chargement)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // requête à l'API
    const response = await getEpreuves(1);

    if (response.data && response.status === 200) {
      setEpreuves(response.data.epreuves);
    } else {
      setEpreuves([]);
      setError(response.error ?? "Impossible de récupérer les épreuves.");
    }

    setLoading(false);
  };

  function memeDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return (
    <Stack spacing={3} padding={3} alignItems={"center"} margin="0 auto">

      <Button
        variant="contained"
        onClick={handleChargerEpreuves}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} /> : "Charger les épreuves"}
      </Button>

      {error ? (
        // Afficher l'erreur
        <Alert severity="error">{error}</Alert>
      ) : (

        <>

          {!loading && epreuves.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Aucune épreuve à afficher.
            </Typography>
          )}

          <Stack >
            {!loading && epreuves.length > 0 && (

              <Stack direction="row" alignItems="center" spacing={5}>
                <Stack height="100dvh" overflow="auto">
                  <Stack spacing={1} minWidth={800} flexGrow={1} p={2}>

                    {listeDateEpreuves.map((dateEpreuve) => (
                      <Stack>
                        <Typography variant="h5" fontWeight={500}>
                          {formatDate(dateEpreuve).split(" ")[0]}
                        </Typography>


                        <Stack spacing={2} sx={{ pt: 2 }}>
                          {epreuves

                            .filter((epreuve) =>
                              memeDate(new Date(epreuve.date), dateEpreuve) &&
                              (selectedValue() === 0 || epreuve.statut === selectedValue())
                            )

                            .map((epreuve) => (
                              <EpreuveCard key={epreuve.code} {...epreuve} />
                            ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                <Divider orientation="vertical" flexItem />
                <Stack p={2} flexGrow={1} minWidth={800} spacing={2}>


                  {/* Map apres de 1 a 5 */}

                  {numbers.map((value) => (
                    <EpreuvesFiltres key={value} value={value} nombreEpreuves={epreuves.filter(epreuve => epreuve.statut === value).length} selected={selected[value]} onClick={() => {
                      setSelected({
                        0: false,
                        1: false,
                        2: false,
                        3: false,
                        4: false,
                        5: false,
                        [value]: !selected[value], // active/désactive la Card cliquée
                      });
                    }}
                    />
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default EpreuvesPage;

/*
  <Typography variant="subtitle2" color="text.secondary">
                  Code : {epreuve.code}<br />
                  Status : {EpreuveStatutNom[epreuve.statut]}<br />
                  Date : {formatDate(epreuve.date)}<br />
                  Durée : {epreuve.duree} minutes<br />
                  Salles : {epreuve.salles.join(', ')}
                </Typography>

            */