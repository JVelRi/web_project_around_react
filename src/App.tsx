import { useEffect, useState } from "react";
import api from "./utils/api.ts";
import CurrentUserContext from "./contexts/CurrentUserContext.tsx";
import type {
  UserData,
  CardData,
  PopupConfig,
  CardFormData,
} from "./types/types.ts";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getCardInfo(),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleCardLike = async (card: CardData) => {
    try {
      api.changeLikeStatus(card._id, card.isLiked).then((updatedCard) => {
        setCards((currentCards) =>
          currentCards.map((c) =>
            c._id === updatedCard._id ? updatedCard : c,
          ),
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard(card._id).then(() => {
        setCards((currentCards) =>
          currentCards.filter((c) => c._id !== card._id),
        );
        handleClosePopup();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (name: string, about: string) => {
    try {
      await api.updateUserInfo(name, about).then((updatedUser) => {
        (setCurrentUser(updatedUser), handleClosePopup());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (avatar: string) => {
    try {
      const updatedAvatar = await api.updateUserAvatar(avatar);
      setCurrentUser(updatedAvatar);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (data: CardFormData) => {
    try {
      api.addCard(data).then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);
        handleClosePopup();
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleOpenPopup(popup: PopupConfig) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
          popup={popup}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
