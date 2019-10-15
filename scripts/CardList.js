class CardList {
  constructor(container, initialCards) {
    this.playList = container;
    this.cards = initialCards;
    this.render();
  }

  addCard(item) {
    const obj = Object.assign(item);

    const img = new Image();

    img.onload = () => {
      const newCard = new Card(obj);
      this.playList.appendChild(newCard.card);
    };
    img.onerror = () => {
      obj.link = './images/noimage.png';
      const newCard = new Card(obj);
      this.playList.appendChild(newCard.card);
    };
    img.src = item.link;
  }

  render() {
    this.cards.forEach(item => {
      this.addCard(item);
    });
  }
}
