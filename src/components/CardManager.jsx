import { useState } from "react";
import initialCardsData from "../data/data.json";
import Card from "../components/Card";
import { useMemo } from "react";
import styles from "./CardManager.module.css";
import shuffleArray from "../scripts/utils";
import Study from "./Study.jsx";
import Filters from "./Filters.jsx";
import CardForm from "./CardForm.jsx";
import ToastMessage from "./ToastMessage.jsx";

export default function CardManager({ studyMode, toggleView }) {
  const [cards, setCards] = useState(initialCardsData);
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isHideMastered, setIsHideMastered] = useState(false);
  const [toastMessages, setToastMessages] = useState([]);

  const handleAddCard = (formData) => {
    if (!formData.question || !formData.answer || !formData.category) return;

    const newCard = {
      id: Date.now(),
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      knownCount: 0,
    };

    setCards([...cards, newCard]);
    setToastMessages((prev) => [...prev, "Card added successfully."]);
  };

  const handleEditCard = (idToUpdate, formData) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === idToUpdate) {
          return { ...card, ...formData };
        }
        return card;
      }),
    );

    setToastMessages((prev) => [...prev, "Card updated successfully."]);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    setToastMessages((prev) => [...prev, "Card deleted."]);
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

  const closeToast = (indexToRemove) => {
    setToastMessages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
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
                {toastMessages.length > 0 ? (
                  <div className="toast-list">
                    {toastMessages.map((toastMessage, index) => (
                      <ToastMessage
                        key={index}
                        text={toastMessage}
                        onClose={() => closeToast(index)}
                      ></ToastMessage>
                    ))}
                  </div>
                ) : null}
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
                    onEdit={handleEditCard}
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
