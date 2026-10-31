type UserData = {
    _id: string;
    name: string;
    about: string;
    avatar: string;
};

type CardData = {
    _id: string;
    name: string;
    link: string;
    isLiked: boolean;
    owner: string;
};

type PopupName = "edit-profile" | "add-card" | "avatar" | "confirm-delete" | "image";
export type { UserData, CardData, PopupName };