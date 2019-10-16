class CardList {
  constructor(container, initialCards, profileOwner, handlerClickCard) {
    this.playList = container;
    this.cards = initialCards;
    this.profileOwner = Object.assign(profileOwner);
    this.handlerClickCard = handlerClickCard;
    this.render();
  }

  addCard(item) {
    const obj = Object.assign(item);

    const img = new Image();

    img.onload = () => {
      const newCard = new Card(obj, this.profileOwner, this.handlerClickCard);
      this.playList.appendChild(newCard.card);
    };
    img.onerror = () => {
      obj.link = './images/noimage.png';
      const newCard = new Card(obj, this.profileOwner, this.handlerClickCard);
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
