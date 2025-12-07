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

  cards.forEach((card) => output.appendChild(createParagraph(card.title)));
  cardManager.sortByTitleAscending();
  output.appendChild(createParagraph("---"));
  cards.forEach((card) => output.appendChild(createParagraph(card.title)));

  cardManager.sortByTitleDescending();
  output.appendChild(createParagraph("---"));
  cards.forEach((card) => output.appendChild(createParagraph(card.title)));
}

function createParagraph(text) {
  const para = document.createElement("p");
  para.innerHTML = text;
  return para;
}
