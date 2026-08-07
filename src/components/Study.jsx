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
          <>
            <StudyCard
              key={cards[currentIndex].id}
              id={cards[currentIndex].id}
              question={cards[currentIndex].question}
              answer={cards[currentIndex].answer}
              category={cards[currentIndex].category}
              knownCount={cards[currentIndex].knownCount}
            ></StudyCard>
            <div className="buttons">
              <button className="btn btn--primary">I Know This</button>
              <button className="btn btn--secondary">Reset Progress</button>
            </div>
          </>
        )}
      </div>
      <div class="study-card__footer">
        <button
          class="btn btn--border icon-btn"
          onClick={handlePrevious}
          aria-label="Go to previous card"
        >
          <img src={ChevronLeft} alt="" aria-hidden="true" />{" "}
          <span className="hide-on-mobile">Previous</span>
        </button>
        <p>
          Card {currentIndex + 1} of {cards.length}
        </p>
        <button
          class="btn btn--border icon-btn"
          onClick={handleNext}
          aria-label="Go to next card"
        >
          <span class="hide-on-mobile">Next</span>{" "}
          <img src={ChevronRight} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
