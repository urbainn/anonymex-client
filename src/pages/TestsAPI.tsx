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

import ClearIcon from '@mui/icons-material/Clear';
import { grey } from "@mui/material/colors";
import theme from "../theme/theme";
import { themeEpreuves } from "../theme/epreuves";
import { EpreuveCard } from "./epreuves/EpreuveCard";

function formatDate(value: Date | string): string {
	const dateValue = typeof value === "string" ? new Date(value) : value;
	return dateValue.toLocaleString();
}

function TestsAPI(): ReactElement {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [epreuves, setEpreuves] = useState<APIEpreuve[]>([]);

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

		if (response.data && response.status === 200) {
			setEpreuves(response.data.epreuves);
		} else {
			setEpreuves([]);
			setError(response.error ?? "Impossible de récupérer les épreuves.");
		}

		setLoading(false);
	};

	return (
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
								<EpreuveCard key={epreuve.code + '-' + epreuve.nom} {...epreuve} />
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