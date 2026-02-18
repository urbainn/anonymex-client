import { useState } from "react";
import SessionEtapeTexte from "./SessionEtapeTexte";
import SessionEtapeBordereau from "./SessionEtapeBordereau";
import SessionEtapeTeleversement from "./SessionEtapeTeleversement";
import { Modal } from "../../../components/Modal";
import { createSession } from "../../../contracts/sessions";
import { URL_API_BASE } from "../../../utils/api";

type Props = {
    onClose: () => void;
    fetchSessions: () => Promise<void>;
};

export default function SessionParentEtape({onClose, fetchSessions}: Props) {
    const [etape, setEtape] = useState(1);

    // Données globales
    const [nomSession, setNomSession] = useState('');
    const [date, setDate] = useState('');
    const [bordereau, setBordereau] = useState(null);
    const [fichier, setFichier] = useState<File | null>(null);

    const [sessionId, setSessionId] = useState<number | null>(null);

    const next = () => setEtape((e) => e + 1);
    const prev = () => setEtape((e) => e - 1);

    const handleCreateSession = async () => {
        const response = await createSession({
            nom: nomSession,
            annee: parseInt(date, 10),
        });

        console.log("Données de la session créée :", response);

        if (response.status !== 200 || !response.data) {
            console.error("Erreur lors de la création de la session :", response.error || "Inconnue");
            return;
        }

        setSessionId(response.data.id);

        next();
    };

    const handleUploadFile = async () => {
        if (!sessionId || !fichier) return;

        const formData = new FormData();
        formData.append("fichier", fichier);

        const response = await fetch(`${URL_API_BASE}/sessions/${sessionId}/importer/`, { 
            method: "POST", 
            body: formData 
        });

        if (!response.ok) {
            const message = await response.text();
            console.error(message || "Échec de l'envoi du fichier.");
            return;
        }

        await fetchSessions();
        onClose();
    };



    return (
        <>
            <Modal onClose={onClose} titre={"Création d'une nouvelle session"} width="600px">
                {etape === 1 && (
                    <SessionEtapeTexte
                        nomSession={nomSession}
                        date={date}
                        setNomSession={setNomSession}
                        setDate={setDate}
                        onNext={next}
                    />
                )}

                {etape === 2 && (
                    <SessionEtapeBordereau
                        bordereau={bordereau}
                        setBordereau={setBordereau}
                        onPrev={prev}
                        onNext={handleCreateSession}          
                    />
                )}

                {etape === 3 && (
                    <SessionEtapeTeleversement
                        fichier={fichier}
                        setFichier={setFichier}
                        onPrev={prev}
                        onValidate={handleUploadFile}
                    />
                )}
            </Modal>
        </>
    );
}
