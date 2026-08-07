import { useState } from "react";

import ChevronDown from "../assets/icons/icon-chevron-down.svg";
import ChevronLeft from "../assets/icons/icon-chevron-left.svg";
import ChevronRight from "../assets/icons/icon-chevron-right.svg";
import Shuffle from "../assets/icons/icon-shuffle.svg";
import StudyCard from "./StudyCard.jsx";

export default function Study({ cards, onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex((prev) => prev + 1);
    else setCurrentIndex(0);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    else setCurrentIndex(cards.length - 1);
  };

  return (
    <div class="card study-card">
      <div class="study-card__header"></div>
      <div class="study-card__main">
        {cards.length === 0 ? (
          <div class="no-cards">
            <h2>No cards to study</h2>
            <p>
              You don't have any cards yet. Add your first card in the All Cards
              tab.
            </p>
            <button class="btn btn--secondary" onClick={onClick}>
              Go to All Cards
            </button>
          </div>
        ) : (
          <StudyCard
            key={cards[currentIndex].id}
            id={cards[currentIndex].id}
            question={cards[currentIndex].question}
            answer={cards[currentIndex].answer}
            category={cards[currentIndex].category}
            knownCount={cards[currentIndex].knownCount}
          ></StudyCard>
        )}
      </div>
      <div class="study-card__footer">
        <button class="btn btn--border" onClick={handlePrevious}>
          <img src={ChevronLeft} alt="" aria-hidden="true" /> Previous
        </button>
        <p>
          Card
          <span class="current-card">{currentIndex + 1}</span>
          of
          <span class="max-cards">{cards.length}</span>
        </p>
        <button class="btn btn--border" onClick={handleNext}>
          Next <img src={ChevronRight} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
