import { CardManager } from "./scripts/CardManager.js";

const cardManager = new CardManager();

cardManager.addCard("What is 2+2?", "4", "Maths", 1);
cardManager.addCard("What is 484?", "16", "Maths", 3);
cardManager.addCard("What is 81/9?", "9", "Maths", 0);
cardManager.addCard("What is 27-15?", "12", "Maths", 5);

const output = document.querySelector(".card-grid");

if (output) {
  let cards = cardManager.getCards();
  if (cards.length === 0) {
    output.append(createElement("No cards yet", "h2"));
    output.append(
      createParagraph(
        "Add your first card using the form above and it will show up here.",
      ),
    );
  } else {
    cards.forEach((card) => output.appendChild(createCard(card)));
  }
}

function createParagraph(text) {
  const para = document.createElement("p");
  para.innerHTML = text;
  return para;
}

function createElement(text, type) {
  const newElement = document.createElement(type);
  newElement.innerHTML = text;
  return newElement;
}

function createCard(card) {
  const newCard = document.createElement("div");
  newCard.classList = "card flashcard";

  const question = createParagraph(card.question);
  const headerRow = createElement("", "div");
  headerRow.classList = "flashcard__header";
  headerRow.append(question);
  newCard.append(headerRow);

  const answerSection = createElement("", "div");
  answerSection.classList = "flashcard__answer";
  const answer = createParagraph(card.answer);
  answer.classList = "flashcard__answer-text";
  answerSection.append(createParagraph("Answer: "));
  answerSection.append(answer);
  newCard.append(answerSection);

  const footerRow = createElement("", "div");
  footerRow.classList = "flashcard__footer";

  const categoryItem = createElement("", "div");
  const category = createElement(card.category, "div");
  category.classList = "btn btn--secondary category-badge";
  categoryItem.append(category);

  const progress = createElement("", "div");
  progress.classList = "footer__progress";
  const progressBar = createElement("", "div");
  progressBar.classList = "progress__bar";
  progressBar.style.setProperty(
    "--progress",
    `${(card.knownCount / 5) * 100}%`,
  );
  const progressAmount = createParagraph(`${card.knownCount}/5`);
  progressAmount.classList = "progress__amount";
  progress.append(progressBar);
  progress.append(progressAmount);

  const menuItem = createElement("", "div");
  const menuButton = createElement("", "button");
  menuButton.classList = "flashcard__menu-button";
  menuItem.append(menuButton);

  footerRow.append(categoryItem);
  footerRow.append(progress);
  footerRow.append(menuItem);

  newCard.append(footerRow);
  return newCard;
}

// Mode Toggle
const modeToggleButtons = document.querySelectorAll(".mode-toggle>button");

const allCardsSection = document.querySelector("section.all-cards");
const studySection = document.querySelector("section.study");

if (modeToggleButtons) {
  modeToggleButtons.forEach((button) =>
    button.addEventListener("click", () => {
      removeClass("active", modeToggleButtons);
      button.classList.add("active");
      if (studySection && allCardsSection) {
        if (button.id === "study-mode") {
          allCardsSection.classList.add("hidden");
          studySection.classList.remove("hidden");
        } else if (button.id === "all-cards") {
          studySection.classList.add("hidden");
          allCardsSection.classList.remove("hidden");
        }
      }
    }),
  );
}

function removeClass(className, elements) {
  elements.forEach((element) => element.classList.remove(className));
}
