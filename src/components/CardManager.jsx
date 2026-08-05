import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";

export default function CardManager() {
  const [cards, setCards] = useState(initialCardsData);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!question || !answer || !category) return;

    const newCard = {
      id: Date.now(),
      question,
      answer,
      category,
      knownCount: 0,
    };

    setCards([...cards, newCard]);
    setQuestion("");
    setAnswer("");
    setCategory("");
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="card-manager">
      <form onSubmit={handleAddCard}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button type="submit">Create Card</button>
      </form>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            question={card.question}
            answer={card.answer}
            category={card.category}
            knownCount={card.knownCount}
            onDelete={handleDeleteCard}
          ></Card>
        ))}
      </div>
    </div>
  );
}
