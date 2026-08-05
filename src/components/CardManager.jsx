import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";

export default function CardManager() {
  const [cards, setCards] = useState(initialCardsData);

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div class="card-grid">
      {cards.map((card) => (
        <Card
          id={card.id}
          question={card.question}
          answer={card.answer}
          category={card.category}
          knownCount={card.knownCount}
          onDelete={handleDeleteCard}
        ></Card>
      ))}
    </div>
  );
}
