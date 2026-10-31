import { useEffect } from "react";
import type { ReactNode } from "react";
import type { PopupName } from "../utils/types";
type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    name: PopupName | null;
}

function Popup(props: PopupProps){
    useEffect(() => {
        if (!props.isOpen) return;

        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") props.onClose();
        }

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [props.isOpen, props.onClose]);

    return (
        <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}
        onClick={(e) => {
            if (e.target === e.currentTarget) props.onClose();
        }}
        >
            <div className={`popup__content ${
                (props.name === "image" || props.name === "confirm-delete")
                ? `popup__content_type_${props.name}`
                : ""
            }`}>
              <button
                aria-label="Cerrar ventana emergente"
                className="popup__close"
                type="button"
                onClick={props.onClose}
              ></button>
              {props.children}
            </div>
        </div>
    )
}

export default Popup;