import React, { useContext, useState, type Dispatch } from "react";
import { createPortal } from 'react-dom';

const ModalContext = React.createContext<{
    modal: React.ReactElement | null;
    setModal: Dispatch<React.ReactElement | null>;
} | null>(null);

export function ModalProvider({ children }: React.PropsWithChildren) {
    const [modal, setModal] = useState<React.ReactElement | null>(null);
    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            { children /* reste de l'application */ }
            { modal !== null ? createPortal(modal, document.body) : null /* modal, dans body */ }
        </ModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
    const context = useContext(ModalContext);

    if (context !== null) {
        return {
            ouvrir: context.setModal,
            fermer: () => context.setModal(null)
        };
    }

    const noop = () => {}; // fonction vide lorsque le contexte n'est pas disponible
    return { ouvrir: noop, fermer: noop };
}