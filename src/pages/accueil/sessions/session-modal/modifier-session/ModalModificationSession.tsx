import React from "react";
import { SessionChampDate, SessionChampTexte, SessionModalBouton } from "../composantsFormulaireSession";
import { Modal } from "../../../../../components/Modal";
import Stack from "@mui/material/Stack";
import { updateSession } from "../../../../../contracts/sessions";
import { Alert, Snackbar } from "@mui/material";


type Props = {
  session: {
    id: number;
    nom: string;
    annee: number;
  };
  onClose: () => void;
  onSuccess: () => void;
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

export default function ModalModificationSession({ session, onClose, onSuccess }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [messageErreurs, setMessageErreurs] = React.useState<string | null>(null);

  const [nom, setNom] = React.useState(session.nom);
  const [annee, setAnnee] = React.useState(session.annee.toString());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = FormValide(nom, annee);
    setErrors(validationErrors);

    if (nom.length === 0 || annee.length === 0) {
      setIsLoading(false);
      return;
    }

    const response = await updateSession(session.id, { 
        nom: nom, 
        annee: parseInt(annee, 10) 
    });

    if (response.status < 200 || response.status >= 300 || !response.data) { 
        console.error("Erreur lors de la modification de la session :", response.error || "Inconnue");
        setMessageErreurs(response.error || "Une erreur inconnue est survenue.");
        setIsLoading(false);
        return; 
    } else { 
        console.log("Session modifiée avec succès :", response.data);
    }

    setIsLoading(false);
    onSuccess();
  };

  return (
    <>
    <Modal onClose={onClose} titre={`Modifier la session "${session.nom}"`}width="550px">
      <Stack component="form" onSubmit={handleSubmit} justifyContent={'space-between'} flexDirection={'column'} gap={2} margin={4}>

        <SessionChampTexte label="Nom de la session" name="nom" onChange={setNom} error={errors.nom} value={nom}/>
        <SessionChampDate label="Année" name="annee" onChange={setAnnee} error={errors.annee} value={annee}/>

        <SessionModalBouton label="Enregistrer" loading={isLoading} />

      </Stack>
    </Modal>

    {messageErreurs && (
      <Snackbar open={!!messageErreurs} autoHideDuration={6000} onClose={() => setMessageErreurs(null)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {messageErreurs}
          </Alert>
      </Snackbar>
    )}

  </>
  );
}
