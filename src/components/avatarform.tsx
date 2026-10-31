import { useState } from "react";
import PopupForm from "./popupform";

type EditAvatar = {
  onSubmit: (avatarUrl: string) => void;
};

function AvatarForm(props: EditAvatar) {
  const [avatarUrl, setAvatarurl] = useState("");

  return (
    <PopupForm submitText="Guardar" onSubmit={() => props.onSubmit(avatarUrl)}>
      <input
        className="popup__input"
        type="url"
        placeholder="Enlace a la imagen"
        required
        minLength={2}
        maxLength={40}
        value={avatarUrl}
        onChange={(e) => setAvatarurl(e.target.value)}
      />
      <span className="popup__input-error"></span>
    </PopupForm>
  );
}

export default AvatarForm;