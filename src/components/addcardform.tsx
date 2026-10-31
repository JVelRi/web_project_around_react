import { useState } from "react";
import PopupForm from "./popupform";

type CardForm = {
  onSubmit: (name: string, url: string) => void;
};

function AddCardForm(props: CardForm) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <PopupForm submitText="Guardar" onSubmit={() => props.onSubmit(name,url)}>
      <input
        className="popup__input"
        type="text"
        placeholder="Titulo"
        required
        minLength={2}
        maxLength={40}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input"
        type="url"
        placeholder="Enlace a la imagen"
        required
        minLength={2}
        maxLength={200}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </PopupForm>
  );
}

export default AddCardForm;