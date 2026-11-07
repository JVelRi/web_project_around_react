import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import useFormValidation from "../../../../hooks/useFormValidation";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  const { errors, isValid, handleChange, validateForm } = useFormValidation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(e.currentTarget)) return;

    if (avatarRef.current) {
      handleUpdateAvatar(avatarRef.current.value);
    }
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_avatar"
        ref={avatarRef}
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        type="url"
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          errors.avatar ? "popup__input-error_active" : ""
        }`}
      >
        {errors.avatar}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
