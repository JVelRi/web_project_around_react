import Content from "./components/content";
import Header from "./components/header";
import Profile from "./components/profile";
import CardList from "./components/cardlist";
import Footer from "./components/footer";
import Popup from "./components/popup";
import PopupContent from "./components/popupcontent";
import type { UserData, CardData, PopupName } from "./utils/types";
import { useEffect, useState } from "react";
import {
  getCardInfo,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addCard,
  deleteCard,
  updateLike,
} from "./utils/api";
import { popupTitles } from "./utils/constants";

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [activePopup, setActivePopup] = useState<PopupName | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  function handleUpdateUser(name: string, about: string) {
    updateUserInfo(name, about)
      .then((updatedUser) => setUser(updatedUser))
      .then(() => setActivePopup(null))
      .catch(console.error);
  }

  function handleUpdateAvatar(avatar: string) {
    updateUserAvatar(avatar)
      .then((updatedAvatar) => setUser(updatedAvatar))
      .then(() => setActivePopup(null))
      .catch(console.error);
  }

  function handleUpdateCard(name: string, link: string) {
    addCard(name, link)
      .then((AddedCard) =>
        setCards((currentCards) => [...currentCards, AddedCard]),
      )
      .then(() => setActivePopup(null))
      .catch(console.error);
  }

  function handleDeleteCard() {
    if (!selectedCard) return;

    deleteCard(selectedCard._id)
      .then(() => {
        setCards((currentCards) =>
          currentCards.filter((card) => card._id !== selectedCard._id),
        );
        setActivePopup(null);
      })
      .catch(console.error);
  }

  function handleUpdateLike(card: CardData) {
    updateLike(card._id, card.isLiked)
      .then((updatedCard: CardData) => {
        setCards((currentCards: CardData[]) =>
          currentCards.map((c: CardData) =>
            c._id === updatedCard._id ? updatedCard : c,
          ),
        );
      })
      .catch(console.error);
  }

  useEffect(() => {
    getCardInfo()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((err) => console.error(err));
    getUserInfo()
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page__content">
      <Header />
      <Content>
        {user && (
          <Profile
            name={user.name}
            about={user.about}
            avatar={user.avatar}
            onEditAvatar={() => setActivePopup("avatar")}
            onEditProfile={() => setActivePopup("edit-profile")}
            onAddCard={() => setActivePopup("add-card")}
          />
        )}
        <CardList
          cards={cards}
          onLike={handleUpdateLike}
          onDelete={(card) => {
            setSelectedCard(card);
            setActivePopup("confirm-delete");
          }}
          onImageClick={(card) => {
            setSelectedCard(card);
            setActivePopup("image");
          }}
        />
      </Content>
      <Footer />
      <Popup
        name={activePopup}
        isOpen={activePopup !== null}
        onClose={() => setActivePopup(null)}
      >
        <h3 className="popup__title">
          {activePopup && popupTitles[activePopup]}
        </h3>
        <PopupContent
          activePopup={activePopup}
          user={user}
          selectedCard={selectedCard}
          onUpdateUser={handleUpdateUser}
          onUpdateAvatar={handleUpdateAvatar}
          onAddCard={handleUpdateCard}
          onConfirmDelete={handleDeleteCard}
        />
      </Popup>
    </div>
  );
}

export default App;
