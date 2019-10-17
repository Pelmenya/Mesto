export default class CardList {
  constructor(container, initialCards, newItemCreate) {
    this.playList = container;
    this.cards = initialCards;
    this.newItemCreate = newItemCreate;
    this.render();
  }

  addCard(item) {
    const obj = Object.assign(item);

    const img = new Image();

    img.onload = () => {
      this.playList.appendChild(this.newItemCreate(obj).card);
    };
    img.onerror = () => {
      obj.link = 'http://margr.ru/assets/images/no-image.jpg';
      this.playList.appendChild(this.newItemCreate(obj).card);
    };
    img.src = item.link;
  }

  render() {
    this.cards.forEach(item => {
      this.addCard(item);
    });
  }
}
