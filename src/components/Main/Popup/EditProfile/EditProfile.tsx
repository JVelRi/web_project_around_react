import { useState } from "react";
import type { FormEvent } from "react";

type EditProfileProps = {
  name: string;
  about: string;
  onSubmit: (name: string, about: string) => void;
};

export default function EditProfile(props: EditProfileProps) {
  const [name, setName] = useState(props.name);
  const [about, setAbout] = useState(props.about);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(name, about);
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        minLength={2}
        maxLength={40}
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Acerca de mí"
        minLength={2}
        maxLength={200}
        required
        type="text"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
