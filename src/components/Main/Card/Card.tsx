import type { CardData } from "../../../types/types";

type CardProps = {
  card: CardData;
  onLike: (card: CardData) => void;
  onDelete: (card: CardData) => void;
  onImageClick: (card: CardData) => void;
};

export default function Card(props: CardProps) {
  const { card, onLike, onDelete, onImageClick } = props;
  const { name, link, isLiked } = card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(card)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={() => onDelete(card)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          type="button"
          className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
          onClick={() => onLike(card)}
        />
      </div>
    </li>
  );
}
