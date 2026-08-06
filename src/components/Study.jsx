import ChevronDown from "../assets/icons/icon-chevron-down.svg";
import ChevronLeft from "../assets/icons/icon-chevron-left.svg";
import ChevronRight from "../assets/icons/icon-chevron-right.svg";
import Shuffle from "../assets/icons/icon-shuffle.svg";
import StudyCard from "./StudyCard.jsx";

export default function Study({ cards, onClick }) {
  return (
    <section class="study">
      <div class="container">
        <div class="card study__card">
          <div class="study-card__header"></div>
          <div class="study-card__main">
            {cards.length === 0 ? (
              <div class="no-cards">
                <h2>No cards to study</h2>
                <p>
                  You don't have any cards yet. Add your first card in the All
                  Cards tab.
                </p>
                <button class="btn btn--secondary" onClick={onClick}>
                  Go to All Cards
                </button>
              </div>
            ) : (
              <StudyCard
                key={cards[0].id}
                id={cards[0].id}
                question={cards[0].question}
                answer={cards[0].answer}
                category={cards[0].category}
                knownCount={cards[0].knownCount}
              ></StudyCard>
            )}
          </div>
          <div class="study-card__footer">
            <button class="btn btn--border">
              <img src={ChevronLeft} alt="" ariaHidden="true" /> Previous
            </button>
            <p>
              Card
              <span class="current-card">1</span>
              of
              <span class="max-cards">{cards.length}</span>
            </p>
            <button class="btn btn--border">
              Next <img src={ChevronRight} alt="" ariaHidden="true" />
            </button>
          </div>
        </div>
        <div class="study__statistics"></div>
      </div>
    </section>
  );
}
