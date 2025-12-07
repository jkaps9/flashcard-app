import { Card } from "/scripts/Card.js";

export class CardManager {
  cardArray = [];

  addCard(title) {
    this.cardArray.push(new Card(title));
    console.log("Card manager created");
  }

  printCards() {
    let output = "";
    this.cardArray.forEach((card) => (output += `${card.toString()} `));
    return output;
  }

  sortAZByTitle() {}
}
