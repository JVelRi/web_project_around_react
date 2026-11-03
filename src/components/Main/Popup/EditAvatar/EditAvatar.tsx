import { useState } from "react";
import type { FormEvent } from "react";

type EditAvatarProps = {
  onSubmit: (avatar: string) => void;
};

export default function EditAvatar(props: EditAvatarProps) {
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(avatar);
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
