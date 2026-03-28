import { useState, type ReactElement } from 'react';
import { TextField, Stack, Button, Tooltip, Autocomplete, CircularProgress, Divider, IconButton, Box } from '@mui/material';

import LeftArrow from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';
import { getRecherche } from '../contracts/recherche';
import { FormatListBulleted, StickyNote2, MeetingRoom, AccessTime, Person, Construction } from '@mui/icons-material';
import { getEpreuve, type APIEpreuve } from '../contracts/epreuves';

interface SearchBarProps {
    onResultClick?: (epreuve: APIEpreuve) => void;
    sessionId: number;
    sessionName?: string;
}

type RechercheResultat =
    { type: 0; code: string; } |
    { type: 1; codeSalle: string; } |
    { type: 2; horodatage: string; } |
    { type: 3; codeSalle: string; horodatage: string; } |
    { type: 4; action: number; } |
    { type: 5; numero: number; };

// Todo : ajouter la couleur pour chaque icone
const rechercheResultatIcones: Record<RechercheResultat['type'], ReactElement> = {
    0: <StickyNote2 fontSize="small" />,
    1: <MeetingRoom fontSize="small" />,
    2: <AccessTime fontSize="small" />,
    3: <MeetingRoom fontSize="small" />,
    4: <Construction fontSize="small" />,
    5: <Person fontSize="small" />,
};

function formatResultat(option: RechercheResultat): string {
    switch (option.type) {
        case 0:
            return `Code UE : ${option.code}`;
        case 1:
            return `Salle : ${option.codeSalle}`;
        case 2:
            return `Heure : ${option.horodatage}`; // Todo : formater l'heure de manière plus lisible
        case 3:
            return `Salle : ${option.codeSalle} à ${option.horodatage}`;
        case 4:
            return `Action : ${option.action}`;
        case 5:
            return `Étudiant : ${option.numero}`;
        default:
            return 'Résultat inconnu';
    }
}

// Todo :
// Pour les resultats de la search bar (maximum 5 affichés)
// Le dernier élément est une option "Voir tous les résultats" qui redirige vers une page de résultats de recherche complète.
// Ajout d'une icone loupe dans la barre de recherche, qui renvoie également vers la page de résultats de recherche complète (avec le terme de recherche déjà rempli).


function SearchBar(props: SearchBarProps) {

    // Liste des résultats de recherche (change a chaque action de recherche)
    const [resultats, setResultats] = useState<RechercheResultat[] | null>(null);

    // Indique si une recherche est en cours (affiche un spinner dans ce cas)
    const [loading, setLoading] = useState(false);

    // Gère le clic sur un résultat de recherche (non-fonctionnelle actuellement)
    async function handleClickResultat(option: RechercheResultat) {
        switch (option.type) {
            case 0:
                const response = await getEpreuve(props.sessionId, option.code);

                console.log("Détails de l'épreuve :", response);

                if (response.status === 200 && response.data) {
                    const epreuve = response.data;
                    props.onResultClick?.(epreuve);
                }
                break;
            case 1:
            // Ouverture du modal de la salle correspondante
            // WIP

        }
    }



    async function fetchResults(value: string) {
        setLoading(true);
        const response = await getRecherche(props.sessionId, value);

        if (response.status !== 200 || !response.data) {
            setResultats(null);
            setLoading(false);
            return;
        }

        setResultats(response.data.resultats);

        console.log("Résultats de recherche :", response.data.resultats);
        setLoading(false);
    }


    const navigate = useNavigate();

    function handleBackToSessions() {
        navigate('/accueil');
    }

    return (
        <Stack spacing={2} alignItems="center" justifyContent={"center"} direction={"row"} width={'100%'}>


            {/* Bouton pour revenir à la liste des sessions */}
            {/* Todo : remplacer par le nom de la session courante cf. EpreuvesPage.tsx */}
            <Tooltip title="Changer de session">
                <Button startIcon={<LeftArrow />}
                    onClick={handleBackToSessions}
                    variant='outlined'
                    sx={{ alignSelf: 'stretch' }}
                >{props.sessionName || 'Nom de session inconnu'}</Button>
            </Tooltip>

            <Autocomplete<RechercheResultat, false, false, true>
                freeSolo
                id="search-input"

                // Affiche un spinner de chargement dans la barre de recherche pendant la recherche
                loading={loading}


                options={resultats ?? []}
                filterOptions={(options) => options}

                // A fix: n'affiche pas "Aucun résultat" quand le résultat de la recherche est vide.
                noOptionsText="Aucun résultat"

                // Style du conteneur !
                sx={{ width: 600, maxWidth: '100%' }}

                getOptionLabel={(option) => typeof option === 'string' ? option : formatResultat(option)}

                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;

                    return (
                        // Disposition en ligne avec une icône à gauche et le texte à droite (et possiblement un texte supplémentaire)
                        <Box
                            key={key}
                            component="li"
                            onClick={() => handleClickResultat(option)}
                            {...optionProps}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mx: 1,
                                my: 0.5,
                                gap: 3,
                                px: 2,
                                py: 1.2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',

                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    transform: 'translateX(4px)',
                                },
                            }}
                        >
                            {/* Icône */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(0,0,0,0.08)',
                                }}
                            >
                                {rechercheResultatIcones[option.type]}
                            </Box>

                            {/* Texte */}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ fontWeight: 500 }}>
                                    {formatResultat(option)}
                                </Box>

                                {/* Sous-texte optionnel */}
                                {/* {option.type && (
                                <Box sx={{ fontSize: 12, color: 'text.secondary' }}>
                                {option.type}
                                </Box>
                            )} */}
                            </Box>
                        </Box>
                    );
                }}
                onInputChange={(_, newInputValue) => {

                    if (newInputValue.trim() === "" || newInputValue.trim().length < 3) {

                        setResultats(null);
                        setLoading(false);
                        return;

                    } else {

                        console.log("Nouveau terme de recherche :", newInputValue);
                        fetchResults(newInputValue);

                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Rechercher une épreuve, une salle, une heure, une action ou un étudiant"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}

                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <IconButton sx={{ p: '10px' }} aria-label="search">
                                            <FormatListBulleted />
                                        </IconButton>
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />
        </Stack >

    );
} export default SearchBar;