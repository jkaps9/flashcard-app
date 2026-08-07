import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";
import { useMemo } from "react";
import styles from "./CardManager.module.css";
import shuffleArray from "../scripts/utils";
import DropdownList from "./DropdownList";
import ShuffleIcon from "../assets/icons/icon-shuffle.svg";
import Study from "./Study.jsx";

export default function CardManager({ studyMode, toggleView }) {
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
    if (displayCount >= filteredCards.length) return;
    if (displayCount + 12 >= filteredCards.length) {
      setDisplayCount(filteredCards.length);
    } else {
      setDisplayCount((prev) => prev + 12);
    }
  };

  const handleResetProgress = (id) => {
    console.log(id);
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, knownCount: 0 } : card)),
    );
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
    <>
      {studyMode ? (
        <Study
          cards={cards}
          onClick={toggleView}
          onResetClick={handleResetProgress}
        ></Study>
      ) : (
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
          <div className={styles.filterRow}>
            <div className={styles.cardFilters}>
              <div className="category-filter">
                <DropdownList
                  listItems={categoriesWithCounts}
                  selectedItems={selectedCategories}
                  handleChange={handleCategoryChange}
                ></DropdownList>
              </div>
              <div className={styles.masteredFilter}>
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
            <button
              className="btn btn--border"
              type="button"
              onClick={handleShuffle}
            >
              <img src={ShuffleIcon} alt="" aria-hidden="true"></img>
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
          {displayCount < filteredCards.length && (
            <button
              type="button"
              className="btn btn--secondary self-centered"
              onClick={handleLoadMoreClick}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
}
