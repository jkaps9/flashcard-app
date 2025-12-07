import { Card } from "/scripts/Card.js";

export class CardManager {
  cardArray = [];

  addCard(title) {
    this.cardArray.push(new Card(title));
    console.log("Card manager created");
  }

  getCards() {
    return this.cardArray;
  }

  printCards() {
    let output = "";
    this.cardArray.forEach((card) => (output += `${card.title} `));
    return output;
  }

  sortByTitleAscending() {
    this.cardArray.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByTitleDescending() {
    this.cardArray.sort((a, b) => b.title.localeCompare(a.title));
  }
}
