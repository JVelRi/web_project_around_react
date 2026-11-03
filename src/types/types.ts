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

export type PopupConfig = {
  title?: string;
  variant?: "image" | "confirm";
  children: React.ReactNode;
};
