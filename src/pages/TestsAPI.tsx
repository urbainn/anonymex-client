import { type ReactElement, useState } from "react";
import {
	Alert,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Stack,
	Typography
} from "@mui/material";
import {
	type APIEpreuve,
	EpreuveStatutNom,
    getEpreuves
} from "../contracts/epreuves";


function formatDate(value: Date | string): string {
	const dateValue = typeof value === "string" ? new Date(value) : value;
	return dateValue.toLocaleString();
}

function TestsAPI(): ReactElement {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [epreuves, setEpreuves] = useState<APIEpreuve[]>([]);

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
				<Stack spacing={2}>
					{epreuves.map((epreuve) => (
						<Card key={`${epreuve.session}-${epreuve.code}`}>
							<CardContent>
								<Typography variant="h6" component="h2">
									{epreuve.nom}
								</Typography>
								<Typography variant="subtitle2" color="text.secondary">
									Code : {epreuve.code}<br />
                                    Status : {EpreuveStatutNom[epreuve.statut]}<br />
                                    Date : {formatDate(epreuve.date)}<br />
                                    Durée : {epreuve.duree} minutes<br />
                                    Salles : {epreuve.salles.join(', ')}
								</Typography>
							</CardContent>
						</Card>
					))}
					{!loading && epreuves.length === 0 && (
						<Typography variant="body2" color="text.secondary">
							Aucune épreuve à afficher.
						</Typography>
					)}
				</Stack>
			)}
		</Stack>
	);
}

export default TestsAPI;
