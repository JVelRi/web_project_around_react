import { useState } from "react";
import type { FormEvent } from "react";

type NewCardProps = {
  onSubmit: (name: string, link: string) => void;
};

export default function NewCard(props: NewCardProps) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(name, link);
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Título"
        minLength={2}
        maxLength={30}
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
