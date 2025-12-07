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
  output.appendChild(createParagraph(cardManager.printCards()));
  cardManager.sortAZByTitle();
  output.appendChild(createParagraph(cardManager.printCards()));
}

function createParagraph(text) {
  const para = document.createElement("p");
  para.innerHTML = text;
  return para;
}
