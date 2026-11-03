import { useEffect, useState } from "react";
import Card from "./Card/Card";
import Popup from "./Popup/Popup";
import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import ImagePopup from "./Popup/ImagePopup/ImagePopup";
import RemoveCard from "./Popup/RemoveCard/RemoveCard";
import type { CardData, PopupConfig, UserData } from "../../types/types";
import {
  addCard,
  changeLikeStatus,
  deleteCard,
  getCardInfo,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from "../../utils/api";

export default function Main() {
  const [user, setUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => {
    getUserInfo()
      .then((data) => setUser(data))
      .catch(console.error);

    getCardInfo()
      .then((data) => setCards(data))
      .catch(console.error);
  }, []);

  function handleOpenPopup(config: PopupConfig): void {
    setPopup(config);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  function handleUpdateUser(name: string, about: string): void {
    updateUserInfo(name, about)
      .then((updatedUser) => {
        setUser(updatedUser);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(avatar: string): void {
    updateUserAvatar(avatar)
      .then((updatedUser) => {
        setUser(updatedUser);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleAddCard(name: string, link: string): void {
    addCard(name, link)
      .then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleDeleteCard(card: CardData): void {
    deleteCard(card._id)
      .then(() => {
        setCards((currentCards) =>
          currentCards.filter((c) => c._id !== card._id),
        );
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleCardLike(card: CardData): void {
    changeLikeStatus(card._id, card.isLiked)
      .then((updatedCard) => {
        setCards((currentCards) =>
          currentCards.map((c) =>
            c._id === updatedCard._id ? updatedCard : c,
          ),
        );
      })
      .catch(console.error);
  }

  const newCardPopup: PopupConfig = {
    title: "Nuevo lugar",
    children: <NewCard onSubmit={handleAddCard} />,
  };

  const editAvatarPopup: PopupConfig = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onSubmit={handleUpdateAvatar} />,
  };

  function getEditProfilePopup(currentUser: UserData): PopupConfig {
    return {
      title: "Editar perfil",
      children: (
        <EditProfile
          name={currentUser.name}
          about={currentUser.about}
          onSubmit={handleUpdateUser}
        />
      ),
    };
  }

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
      children: <RemoveCard onConfirm={() => handleDeleteCard(card)} />,
    };
  }

  return (
    <main className="content">
      {user && (
        <section className="profile page__section">
          <div className="profile__avatar-wrapper">
            <img className="profile__image" src={user.avatar} alt="Avatar" />
            <button
              aria-label="Cambiar foto de perfil"
              className="profile__avatar-edit-button"
              type="button"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{user.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => handleOpenPopup(getEditProfilePopup(user))}
            />
            <p className="profile__description">{user.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </section>
      )}
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onLike={handleCardLike}
              onDelete={(c) => handleOpenPopup(getRemoveCardPopup(c))}
              onImageClick={(c) => handleOpenPopup(getImagePopup(c))}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          variant={popup.variant}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
