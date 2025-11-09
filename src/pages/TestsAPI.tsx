import { type ReactElement, useState, useEffect } from "react";
import {
	Alert,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Stack,
	Typography,
} from "@mui/material";
import {
	type APIEpreuve,
	EpreuveStatutNom,
	getEpreuves
} from "../contracts/epreuves";

import { ThemeProvider, useTheme } from '@mui/material/styles';

import ClearIcon from '@mui/icons-material/Clear';
import { grey } from "@mui/material/colors";
import theme from "../theme/theme";

function formatDate(value: Date | string): string {
	const dateValue = typeof value === "string" ? new Date(value) : value;
	return dateValue.toLocaleString();
}

function TestsAPI(): ReactElement {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [epreuves, setEpreuves] = useState<APIEpreuve[]>([]);
	

	type StatusKey = keyof typeof theme.couleurs.status;
	
	const statutOptions: Record<number, StatusKey> = {
		1: "materielNonImprime",
		2: "materielImprime",
		3: "attenteDepot",
		4: "depotComplet",
		5: "notesExportees",
		6: "incidents",
	};


	console.log("Theme colors:", theme.couleurs);

	useEffect(() => {
		epreuves.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		console.log("Épreuves triées :", epreuves);
	}, [epreuves]);

	// Charger et afficher les épreuves
	const handleChargerEpreuves = async (): Promise<void> => {
		setLoading(true);
		setError(null);

		// attendre 2 secondes (voir le chargement)
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// requête à l'API
		const response = await getEpreuves(1);

		if (response.data) {
			setEpreuves(response.data.epreuves);


		} else {
			setEpreuves([]);
			setError(response.error ?? "Impossible de récupérer les épreuves.");
		}

		setLoading(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<Stack spacing={3} padding={3} maxWidth={960} margin="0 auto">

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

						<Stack spacing={1} width={600}>
							{epreuves.map((epreuve) => (
								<>

								{/* Liste Epreuves */}

									<Card 
										key={`${epreuve.session}-${epreuve.code}`}
										sx={{
											borderRadius: 2,
											bgcolor: theme.couleurs.paper.default,
											width: '100%',
											position: 'relative',
											'&:hover': {
												bgcolor: theme.couleurs.paper.hovered,
											},
										}}
									>
										
										<Stack direction="row" alignItems="center" px={2} py={1} spacing={2}>
											<ClearIcon color="action" sx={{ bgcolor: grey[400], borderRadius: 10, p: 0.2 }} />

									
											<Stack direction="column" alignItems="flex-start" flexGrow={1}>
												<Typography variant="body2" component="h2" fontWeight={500}>
													{epreuve.nom}
												</Typography>

												<Typography variant="caption" color="text.secondary">
													{epreuve.salles.join(', ')}
												</Typography>
											</Stack>

											{/* Carré avec heure à droite */}
											<Stack
												alignItems="center"
												justifyContent="center"
												sx={{
													position: 'absolute',
													top: 0,
													right: 0,
													width: 60,
													height: 60,
													bgcolor: theme.couleurs.status[statutOptions[epreuve.statut]],
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}

											>
												<Typography variant="caption">
													{formatDate(epreuve.date).split(' ')[1]}
												</Typography>
											</Stack>
										</Stack>
									</Card>

								</>
							))}
							{!loading && epreuves.length === 0 && (
								<Typography variant="body2" color="text.secondary">
									Aucune épreuve à afficher.
								</Typography>
							)}
						</Stack>
					</>
				)}
			</Stack>
		</ThemeProvider>
	);
}

export default TestsAPI;

/*
	<Typography variant="subtitle2" color="text.secondary">
									Code : {epreuve.code}<br />
									Status : {EpreuveStatutNom[epreuve.statut]}<br />
									Date : {formatDate(epreuve.date)}<br />
									Durée : {epreuve.duree} minutes<br />
									Salles : {epreuve.salles.join(', ')}
								</Typography>

						*/