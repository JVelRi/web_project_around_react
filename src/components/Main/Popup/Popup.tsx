import { useEffect } from "react";
import type { PopupConfig } from "../../../types/types";

type PopupProps = {
  title?: string;
  variant?: PopupConfig["variant"];
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function Popup(props: PopupProps) {
  const { title, variant, children, onClose, isOpen } = props;

  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${isOpen ? "popup_is-opened" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`popup__content ${variant ? `popup__content_type_${variant}` : ""}`}
      >
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
