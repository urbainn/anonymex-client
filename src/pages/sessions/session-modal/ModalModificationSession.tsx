import React from "react";
import { SessionBoutonSecondaire, SessionBoutonSubmit } from "./composantsFormulaireSession";
import { Modal } from "../../../components/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { updateSession } from "../../../contracts/sessions";


type Props = {
  session: {
    id: number;
    nom: string;
    annee: number;
  };
  onClose: () => void;
};

type FormErrors = {
  nom?: string;
  annee?: string;
};

function FormValide(nom: string, annee: string): FormErrors {
    const newErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();
    const year = parseInt(annee, 10);

    if (!nom.trim()) newErrors.nom = "Le nom est requis.";
    if (year < currentYear -1) newErrors.annee = `L'année doit être supérieure à ${currentYear - 1}`;

    return newErrors;
}

export default function ModalModificationSession({ session, onClose }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const nom = formData.get("nom") as string;
    const annee = formData.get("annee") as string;

    const validationErrors = FormValide(nom, annee);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    const response = await updateSession(session.id, { 
        nom: nom, 
        annee: parseInt(annee, 10) 
    });

    setIsLoading(false);

    if (response.status !== 200 || !response.data) { 
        console.error("Erreur lors de la modification de la session :", response.error || "Inconnue");
        return; 
    } else { 
        console.log("Session modifiée avec succès :", response.data);
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} titre="Modifier la session" width="550px">
      <Stack component="form" onSubmit={handleSubmit} justifyContent={'space-between'} flexDirection={'column'} gap={2} margin={4}>
        <Typography color="text.secondary" mb={1}>
          Modifiez les informations puis enregistrez.
        </Typography>

        <TextField label="Nom de la session" name="nom" defaultValue={session.nom} margin="normal" helperText={errors.nom}disabled={isLoading}/>

        <TextField label="Année" name="annee" defaultValue={session.annee} margin="normal" helperText={errors.annee} disabled={isLoading}
        />

        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <SessionBoutonSecondaire label="Annuler" onClick={onClose} />
          <SessionBoutonSubmit label="Enregistrer" loading={isLoading} />
        </Stack>
      </Stack>
    </Modal>
  );
}
