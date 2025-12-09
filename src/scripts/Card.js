export class Card {
  constructor(question, answer, category, knownCount = 0) {
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.knownCount = knownCount;
  }

  toString() {
    return `Question: ${this.question}, Answer: ${this.answer}, Category: ${this.category}, knownCount: ${this.knownCount}`;
  }
}
