import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Card from "./Card/Card";
import Popup from "./Popup/Popup";
import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import ImagePopup from "./Popup/ImagePopup/ImagePopup";
import RemoveCard from "./Popup/RemoveCard/RemoveCard";
import type { CardData, PopupConfig } from "../../types/types";

type MainProps = {
  cards: CardData[];
  handleOpenPopup: (config: PopupConfig) => void;
  handleCardDelete: (card: CardData) => void;
  handleCardLike: (card: CardData) => void;
  handleClosePopup: () => void;
  popup: PopupConfig | null;
};

export default function Main(props: MainProps) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup: PopupConfig = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editAvatarPopup: PopupConfig = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  const editProfilePopup: PopupConfig = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  function getImagePopup(card: CardData): PopupConfig {
    return {
      variant: "image",
      children: <ImagePopup card={card} />,
    };
  }

  function getRemoveCardPopup(card: CardData): PopupConfig {
    return {
      title: "¿Estás seguro?",
      variant: "confirm",
      children: <RemoveCard onConfirm={() => props.handleCardDelete(card)} />,
    };
  }

  return (
    <main className="content">
      {currentUser && (
        <section className="profile page__section">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Avatar"
            />
            <button
              aria-label="Cambiar foto de perfil"
              className="profile__avatar-edit-button"
              type="button"
              onClick={() => props.handleOpenPopup(editAvatarPopup)}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => props.handleOpenPopup(editProfilePopup)}
            />
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => props.handleOpenPopup(newCardPopup)}
          />
        </section>
      )}
      <section className="cards page__section">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onLike={props.handleCardLike}
              onDelete={(c) => props.handleOpenPopup(getRemoveCardPopup(c))}
              onImageClick={(c) => props.handleOpenPopup(getImagePopup(c))}
            />
          ))}
        </ul>
      </section>
      {props.popup && (
        <Popup
          onClose={props.handleClosePopup}
          title={props.popup.title}
          variant={props.popup.variant}
          isOpen={true}
        >
          {props.popup.children}
        </Popup>
      )}
    </main>
  );
}
