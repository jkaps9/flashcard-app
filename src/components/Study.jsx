import { useState } from "react";
import CircleCheck from "../assets/icons/icon-circle-check.svg";
import ChevronLeft from "../assets/icons/icon-chevron-left.svg";
import ChevronRight from "../assets/icons/icon-chevron-right.svg";
import ResetIcon from "../assets/icons/icon-reset.svg";
import StudyCard from "./StudyCard.jsx";
import StudyStatistics from "./StudyStatistics.jsx";

export default function Study({
  allCards,
  filteredCards,
  onClick,
  onResetClick,
  onIKnowThisClick,
  isHideMastered,
  children,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex =
    filteredCards.length > 0 && currentIndex >= filteredCards.length
      ? 0
      : currentIndex;

  const handleNext = () => {
    if (safeIndex < filteredCards.length - 1) setCurrentIndex(safeIndex + 1);
    else setCurrentIndex(0);
  };

  const handlePrevious = () => {
    if (safeIndex > 0) setCurrentIndex(safeIndex - 1);
    else setCurrentIndex(filteredCards.length - 1);
  };

  const currentCard = filteredCards[safeIndex];
  return (
    <>
      <section>
        <div className="container">
          <div className="card study-card">
            <div className="study-card__header">{children}</div>
            <div className="study-card__main">
              {allCards.length === 0 ? (
                <div className="no-cards">
                  <h2>No cards to study</h2>
                  <p>
                    You don't have any cards yet. Add your first card in the All
                    Cards tab.
                  </p>
                  <button className="btn btn--secondary" onClick={onClick}>
                    Go to All Cards
                  </button>
                </div>
              ) : filteredCards.length === 0 ? (
                <div className="no-cards">
                  <h2>No cards match your filters</h2>
                  <p>
                    Try adjusting your categories or unchecking your mastered
                    filter.
                  </p>
                </div>
              ) : currentCard ? (
                <>
                  <StudyCard
                    key={currentCard.id}
                    id={currentCard.id}
                    question={currentCard.question}
                    answer={currentCard.answer}
                    category={currentCard.category}
                    knownCount={currentCard.knownCount}
                  ></StudyCard>

                  <div className="buttons">
                    <button
                      className="btn btn--primary"
                      onClick={() => {
                        onIKnowThisClick(currentCard.id);
                        const willBeFilteredOut =
                          isHideMastered && currentCard.knownCount === 4;
                        if (!willBeFilteredOut) {
                          handleNext();
                        }
                      }}
                      disabled={currentCard.knownCount === 5}
                    >
                      <img src={CircleCheck} alt="" aria-hidden="true" />
                      {currentCard.knownCount === 5
                        ? "Already Mastered"
                        : "I Know This"}
                    </button>
                    <button
                      className="btn btn--secondary"
                      onClick={() => onResetClick(currentCard.id)}
                    >
                      <img src={ResetIcon} alt="" aria-hidden="true" />
                      Reset Progress
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            {filteredCards.length > 0 && (
              <div className="study-card__footer">
                <button
                  className="btn btn--border icon-btn"
                  onClick={handlePrevious}
                  aria-label="Go to previous card"
                >
                  <img src={ChevronLeft} alt="" aria-hidden="true" />{" "}
                  <span className="hide-on-mobile">Previous</span>
                </button>
                <p>
                  Card {safeIndex + 1} of {filteredCards.length}
                </p>
                <button
                  className="btn btn--border icon-btn"
                  onClick={handleNext}
                  aria-label="Go to next card"
                >
                  <span className="hide-on-mobile">Next</span>
                  <img src={ChevronRight} alt="" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="study-statistics">
            <StudyStatistics cards={allCards}></StudyStatistics>
          </div>
        </div>
      </section>
    </>
  );
}
