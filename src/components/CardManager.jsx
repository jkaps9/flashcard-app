import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";
import { useMemo } from "react";

export default function CardManager() {
  const [cards, setCards] = useState(initialCardsData);
  const [displayCount, setDisplayCount] = useState(12);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleLoadMoreClick = () => {
    if (displayCount >= cards.length) return;
    if (displayCount + 12 >= cards.length) {
      setDisplayCount(cards.length);
    } else {
      setDisplayCount((prev) => prev + 12);
    }
  };

  const categoriesWithCounts = useMemo(() => {
    const tally = cards.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const formattedCategories = Object.entries(tally).map(([name, count]) => {
      return { name, count };
    });

    formattedCategories.sort((a, b) => a.name.localeCompare(b.name));

    return [...formattedCategories];
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (selectedCategories.length === 0) return cards;
    return cards.filter((card) => selectedCategories.includes(card.category));
  }, [selectedCategories, cards]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value),
      );
    }
  };

  return (
    <div className="card-manager">
      <form onSubmit={handleAddCard} className="card">
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
      <div className="button-row">
        <button
          type="button"
          className="btn"
          ariaExpanded="false"
          id="categoryFilterButton"
        >
          All Categories
        </button>
        <fieldset>
          {categoriesWithCounts.map((category) => (
            <>
              <input
                type="checkbox"
                id={category.name}
                name="category"
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category.name}>
                {category.name} ({category.count})
              </label>
            </>
          ))}
        </fieldset>
      </div>
      <div className="card-grid">
        {filteredCards.slice(0, displayCount).map((card) => (
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
      {displayCount < cards.length && (
        <button type="button" className="btn" onClick={handleLoadMoreClick}>
          Load More
        </button>
      )}
    </div>
  );
}
