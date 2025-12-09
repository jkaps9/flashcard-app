import { Card } from "/scripts/Card.js";

export class CardManager {
  cardArray = [];

  addCard(question, answer, category) {
    this.cardArray.push(new Card(question, answer, category));
    console.log("Card manager created");
  }

  getCards() {
    return this.cardArray;
  }

  printCards() {
    let output = "";
    this.cardArray.forEach((card) => (output += `${card.question} `));
    return output;
  }

  sortByQuestionAscending() {
    this.cardArray.sort((a, b) => a.question.localeCompare(b.question));
  }

  sortByQuestionDescending() {
    this.cardArray.sort((a, b) => b.question.localeCompare(a.question));
  }
}
