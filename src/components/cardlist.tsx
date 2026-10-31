import Card from './card';
import type { CardData } from '../utils/types';

type CardListProps = {
    cards: CardData[];
    onLike: (card: CardData) => void;
    onDelete: (card: CardData) => void;
    onImageClick: (card: CardData) => void;
};

function CardList(props: CardListProps) {
    return (
        <section className="cards page__section">
            <ul className="cards__list">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onLike={props.onLike}
                        onDelete={props.onDelete}
                        onImageClick={props.onImageClick}
                    />
                ))}
            </ul>
        </section>
    );
}

export default CardList