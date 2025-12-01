import { useState } from "react";
import SessionEtapeTexte from "./SessionEtapeTexte";
import SessionEtapeBordereau from "./SessionEtapeBordereau";
import SessionEtapeTeleversement from "./SessionEtapeTeleversement";
import { Modal } from "../../../components/Modal";
import { createSession } from "../../../contracts/sessions";

export default function SessionParentEtape({onClose}: {onClose: () => void}) {
    const [etape, setEtape] = useState(1);

    // Données globales
    const [nomSession, setNomSession] = useState('');
    const [date, setDate] = useState('');
    const [bordereau, setBordereau] = useState('');
    const [fichier, setFichier] = useState<File | null>(null);

    const next = () => setEtape((e) => e + 1);
    const prev = () => setEtape((e) => e - 1);

    const onFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            const response = await createSession({
                nom: nomSession,
                annee: parseInt(date, 10)
            });
    
            if (response.status !== 200 || !response.data) {
                console.error("Erreur lors de la création de la session :", response.error || "Inconnue");
                return;
            } else {
                // Succès
                console.log("Session créée avec succès :", response.data);
                onClose();
            }
    
            
            
    }

    return (
        <>
            <Modal onClose={onClose} titre={"Création d'une nouvelle session"}>
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
                        onNext={next}
                    />
                )}

                {etape === 3 && (
                    <SessionEtapeTeleversement
                        fichier={fichier}
                        setFichier={setFichier}
                        onPrev={prev}
                        onValidate={onFinalSubmit}
                    />
                )}
            </Modal>
        </>
    );
}
