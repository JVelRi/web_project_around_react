import type { CardData } from "../utils/types";

type ImagePreviewProps = {
  card: CardData;
};

function ImagePreview(props: ImagePreviewProps) {
  return (
    <>
      <img
        alt={props.card.name}
        className="popup__image"
        src={props.card.link}
      />
      <p className="popup__caption">{props.card.name}</p>
    </>
  );
}

export default ImagePreview;