import ChevronDown from "../assets/icons/icon-chevron-down.svg";
import ChevronLeft from "../assets/icons/icon-chevron-left.svg";
import ChevronRight from "../assets/icons/icon-chevron-right.svg";
import Shuffle from "../assets/icons/icon-shuffle.svg";

export default function Study({ onClick }) {
  return (
    <section class="study">
      <div class="container">
        <div class="card study__card">
          <div class="study-card__header"></div>
          <div class="study-card__main">
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
          </div>
          <div class="study-card__footer">
            <button class="btn btn--border">
              <img src={ChevronLeft} alt="" ariaHidden="true" /> Previous
            </button>
            <p>
              Card
              <span class="current-card">1</span>
              of
              <span class="max-cards">40</span>
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
