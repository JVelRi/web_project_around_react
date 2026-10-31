import type { CardData } from '../utils/types';

type CardProps = {
    card: CardData;
    onLike: (card: CardData) => void;
    onDelete: (card: CardData) => void;
    onImageClick: (card: CardData) => void;
};

function Card(props: CardProps) {
    return (
        <li className="card">
          <img 
            className="card__image" 
            src={props.card.link}
            alt={props.card.name} 
            onClick={() => props.onImageClick(props.card)}
          />
          <button
            aria-label="Eliminar tarjeta"
            className="card__delete-button"
            type="button"
            onClick={() => props.onDelete(props.card)}
          ></button>
          <div className="card__description">
            <h2 className="card__title">{props.card.name}</h2>
            <button
              aria-label="Botón Me gusta"
              className={`card__like-button ${props.card.isLiked ? 'card__like-button_is-active' : ""}`}
              type="button"
              onClick={() => props.onLike(props.card)}
            ></button>
          </div>
        </li>
    )
}

export default Card;