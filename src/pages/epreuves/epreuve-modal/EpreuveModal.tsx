import { Modal } from "../../../components/Modal";
import { useModal } from "../../../contexts/ModalContext";

export function EpreuveModal() {
    const { fermer } = useModal();
    return (
        <Modal titre="Mise en situation" onClose={fermer} >
            salut :=)
        </Modal>
    );
}