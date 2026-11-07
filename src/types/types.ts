export type UserData = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
};

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export type PopupConfig = {
  title?: string;
  variant?: "image" | "confirm";
  children: React.ReactNode;
};

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (name: string, about: string) => Promise<void>;
  handleUpdateAvatar: (avatar: string) => Promise<void>;
  handleAddPlaceSubmit: (data: CardFormData) => Promise<void>;
}
