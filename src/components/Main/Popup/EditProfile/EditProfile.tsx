import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import useFormValidation from "../../../../hooks/useFormValidation";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");

  const { errors, isValid, handleChange, validateForm } = useFormValidation();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!validateForm(e.currentTarget)) return;
    handleUpdateUser(name, description);
  }
  if (!currentUser) return null;

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
        onChange={(e) => {
          setName(e.target.value);
          handleChange(e);
        }}
      />
      <span
        className={`popup__input-error ${
          errors.name ? "popup__input-error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Acerca de mí"
        minLength={2}
        maxLength={200}
        required
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          handleChange(e);
        }}
      />
      <span
        className={`popup__input-error ${
          errors.description ? "popup__input-error_active" : ""
        }`}
      >
        {errors.description}
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
