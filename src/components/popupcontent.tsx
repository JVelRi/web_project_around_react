import EditProfileForm from "./editprofileform";
import AddCardForm from "./addcardform";
import AvatarForm from "./avatarform";
import ConfirmDelete from "./confirmdelete";
import ImagePreview from "./imagepreview";
import type { UserData, CardData, PopupName } from "../utils/types";

type PopupContentProps = {
  activePopup: PopupName | null;
  user: UserData | null;
  selectedCard: CardData | null;
  onUpdateUser: (name: string, about: string) => void;
  onUpdateAvatar: (avatarUrl: string) => void;
  onAddCard: (name: string, link: string) => void;
  onConfirmDelete: () => void;
};

function PopupContent(props: PopupContentProps) {
  switch (props.activePopup) {
    case "edit-profile":
      return (
        props.user && (
          <EditProfileForm
            name={props.user.name}
            about={props.user.about}
            onSubmit={props.onUpdateUser}
          />
        )
      );
    case "avatar":
      return <AvatarForm onSubmit={props.onUpdateAvatar} />;
    case "add-card":
      return <AddCardForm onSubmit={props.onAddCard} />;
    case "confirm-delete":
      return <ConfirmDelete onConfirm={props.onConfirmDelete} />;
    case "image":
      return props.selectedCard && <ImagePreview card={props.selectedCard} />;
    default:
      return null;
  }
}

export default PopupContent;
