import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";
import { useMemo } from "react";
import styles from "./CardManager.module.css";
import shuffleArray from "../scripts/utils";

export default function CardManager() {
  const [cards, setCards] = useState(initialCardsData);
  const [displayCount, setDisplayCount] = useState(12);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isHideMastered, setIsHideMastered] = useState(false);

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
    return cards.filter((card) => {
      const categoryMatch =
        selectedCategories.length > 0
          ? selectedCategories.includes(card.category)
          : true;

      const masterCheck = isHideMastered ? card.knownCount !== 5 : true;

      console.log(masterCheck);
      return categoryMatch && masterCheck;
    });
  }, [selectedCategories, isHideMastered, cards]);

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

  const handleShuffle = () => {
    setCards((prev) => shuffleArray(prev));
  };

  return (
    <div className={styles.cardManager}>
      <form onSubmit={handleAddCard} className="card">
        <div className="input-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is the capital of France?"
          />
        </div>
        <div className="input-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="e.g., Paris"
            rows={3}
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Geography"
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Create Card
        </button>
      </form>
      <div className="row">
        <div className="filters">
          <div className="category-filter">
            <button
              type="button"
              className="btn"
              aria-expanded="false"
              id="categoryFilterButton"
            >
              All Categories
            </button>
            <fieldset className={styles.dropdownList}>
              {categoriesWithCounts.map((category) => (
                <div key={category.name}>
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
                </div>
              ))}
            </fieldset>
          </div>
          <div className="mastered-filter">
            <input
              type="checkbox"
              id="hideMastered"
              name="hideMastered"
              value="hide-mastered"
              checked={isHideMastered}
              onChange={(e) => setIsHideMastered(e.target.checked)}
            />
            <label htmlFor="hideMastered">Hide Mastered</label>
          </div>
        </div>
        <button className="btn" type="button" onClick={handleShuffle}>
          Shuffle
        </button>
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
