import { CardManager } from "./scripts/CardManager.js";

const fruits = [
  "Grapes",
  "Apples",
  "Oranges",
  "Bananas",
  "Watermelons",
  "Pineapples",
  "Coconuts",
];

const cardManager = new CardManager();
fruits.forEach((fruit) => cardManager.addCard(fruit));

console.log(cardManager.printCards());

const output = document.querySelector(".output");

if (output) {
  let cards = cardManager.getCards();

  cards.forEach((card) => output.appendChild(createParagraph(card.question)));
  cardManager.sortByQuestionAscending();
  output.appendChild(createParagraph("---"));
  cards.forEach((card) => output.appendChild(createParagraph(card.question)));

  cardManager.sortByQuestionDescending();
  output.appendChild(createParagraph("---"));
  cards.forEach((card) => output.appendChild(createParagraph(card.question)));
}

function createParagraph(text) {
  const para = document.createElement("p");
  para.innerHTML = text;
  return para;
}

function createCard(card) {
  const card = document.createElement("div");
  card.classList = "card";
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
