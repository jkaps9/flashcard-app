import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";
import { useMemo } from "react";
import styles from "./CardManager.module.css";
import shuffleArray from "../scripts/utils";
import Study from "./Study.jsx";
import Filters from "./Filters.jsx";
import CardForm from "./CardForm.jsx";

export default function CardManager({ studyMode, toggleView }) {
  const [cards, setCards] = useState(initialCardsData);
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isHideMastered, setIsHideMastered] = useState(false);

  const handleAddCard = (formData) => {
    console.log(formData);
    if (!formData.question || !formData.answer || !formData.category) return;

    const newCard = {
      id: Date.now(),
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      knownCount: 0,
    };

    setCards([...cards, newCard]);
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

  const handleResetProgress = (targetId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === targetId ? { ...card, knownCount: 0 } : card,
      ),
    );
  };

  const increaseProgress = (targetId) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === targetId
          ? {
              ...card,
              knownCount:
                card.knownCount < 5 ? card.knownCount + 1 : card.knownCount,
            }
          : card,
      ),
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

  const filteredCards = cards.filter((card) => {
    const categoryMatch =
      selectedCategories.length > 0
        ? selectedCategories.includes(card.category)
        : true;

    const masterCheck = isHideMastered ? card.knownCount !== 5 : true;

    return categoryMatch && masterCheck;
  });

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

  const handleMasteredCheck = () => {
    setIsHideMastered((prev) => !prev);
  };

  return (
    <>
      {studyMode ? (
        <Study
          allCards={cards}
          filteredCards={filteredCards}
          onClick={toggleView}
          onResetClick={handleResetProgress}
          onIKnowThisClick={increaseProgress}
          isHideMastered={isHideMastered}
        >
          <Filters
            categoriesWithCounts={categoriesWithCounts}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            handleShuffle={handleShuffle}
            isHideMastered={isHideMastered}
            handleMasteredCheck={handleMasteredCheck}
          ></Filters>
        </Study>
      ) : (
        <section>
          <div className="container">
            <div className={styles.cardManager}>
              <div className="card">
                <CardForm
                  onSubmit={handleAddCard}
                  buttonText="Add Card"
                ></CardForm>
              </div>
              <Filters
                categoriesWithCounts={categoriesWithCounts}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                handleShuffle={handleShuffle}
                isHideMastered={isHideMastered}
                handleMasteredCheck={handleMasteredCheck}
              ></Filters>
              <div className="card-grid">
                {filteredCards.slice(0, displayCount).map((card) => (
                  <Card
                    key={card.id}
                    card={card}
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
          </div>
        </section>
      )}
    </>
  );
}
