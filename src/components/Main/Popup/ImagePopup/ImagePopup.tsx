import type { CardData } from "../../../../types/types";

type ImagePopupProps = {
  card: CardData;
};

export default function ImagePopup(props: ImagePopupProps) {
  const { name, link } = props.card;

  return (
    <>
      <img alt={name} className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </>
  );
}
