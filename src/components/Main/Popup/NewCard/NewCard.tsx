import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import useFormValidation from "../../../../hooks/useFormValidation";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const { errors, isValid, handleChange, validateForm } = useFormValidation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;

    handleAddPlaceSubmit({ name, link });
  };

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
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
          handleChange(e);
        }}
      />
      <span
        className={`popup__input-error ${
          errors.link ? "popup__input-error_active" : ""
        }`}
      >
        {errors.link}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Crear
      </button>
    </form>
  );
}
