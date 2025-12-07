export class Card {
  constructor(title) {
    this.title = title;
  }

  toString() {
    return `Title: ${this.title}`;
  }
}
