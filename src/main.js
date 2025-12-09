import { CardManager } from "./scripts/CardManager.js";

const cardManager = new CardManager();

cardManager.addCard("What is 2+2?", "4", "Maths");
cardManager.addCard("What is 484?", "16", "Maths");
cardManager.addCard("What is 81/9?", "9", "Maths");
cardManager.addCard("What is 27-15?", "12", "Maths");

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
  newCard.classList = "card";

  const question = createParagraph(card.question);
  const answer = createParagraph(card.answer);

  newCard.append(question);
  newCard.append(answer);

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
