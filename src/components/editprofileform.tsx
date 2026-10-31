import { useState } from "react";
import PopupForm from "./popupform";

type EditProfileFormProps = {
  name: string;
  about: string;
  onSubmit: (name: string, about: string) => void;
};

function EditProfileForm(props: EditProfileFormProps) {
  const [name, setName] = useState(props.name);
  const [about, setAbout] = useState(props.about);

  return (
    <PopupForm submitText="Guardar" onSubmit={() => props.onSubmit(name,about)}>
      <input
        className="popup__input"
        type="text"
        placeholder="Nombre"
        required
        minLength={2}
        maxLength={40}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input"
        type="text"
        placeholder="Acerca de mí"
        required
        minLength={2}
        maxLength={200}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
    </PopupForm>
  );
}

export default EditProfileForm;