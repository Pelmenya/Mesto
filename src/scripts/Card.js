export default class Card {
  constructor(item, profileOwner, imagePopupOpen, deleteCard, likeCard) {
    this.cardParametrs = Object.assign(item);

    this.profileOwner = Object.assign(profileOwner);

    this.imagePopupOpen = imagePopupOpen;
    this.deleteCard = deleteCard;
    this.likeCard = likeCard;


    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.openTrueImg = this.openTrueImg.bind(this);

    this.card = this.creatCard();

    this.likeButton = this.card.querySelector('.place-card__like-icon');
    this.removeButton = this.card.querySelector('.place-card__delete-icon');
    this.cardImg = this.card.querySelector('.place-card__image');

    this.likeButton.addEventListener('click', this.like);
    this.removeButton.addEventListener('click', this.remove);
    this.cardImg.addEventListener('click', this.openTrueImg);
  }

  static createElementCard(element, classElement, textContent = false, styleElement = false) {
    const newElement = document.createElement(element);
    newElement.className = classElement;
    if (textContent !== false) {
      newElement.textContent = textContent;
    }
    if (styleElement !== false) {
      newElement.setAttribute('style', styleElement);
    }
    return newElement;
  }

  creatCard() {
    const placeCard = Card.createElementCard('div', 'place-card');
    placeCard
      .appendChild(
        Card.createElementCard(
          'div',
          'place-card__image',
          false,
          `background-image: url(${this.cardParametrs.link});`
        )
      )
      .appendChild(Card.createElementCard('button', 'place-card__delete-icon'));
    placeCard
      .appendChild(Card.createElementCard('div', 'place-card__description'))
      .appendChild(Card.createElementCard('h3', 'place-card__name', this.cardParametrs.name));

    placeCard
      .querySelector('.place-card__description')
      .appendChild(Card.createElementCard('div', 'place-card__like-container'));

    placeCard
      .querySelector('.place-card__like-container')
      .appendChild(Card.createElementCard('button', 'place-card__like-icon'));

    if (
      this.cardParametrs.likes.some(item => {
        return item._id === this.profileOwner._id;
      })
    ) {
      placeCard
        .querySelector('.place-card__like-icon')
        .classList.add('place-card__like-icon_liked');
    }

    placeCard
      .querySelector('.place-card__like-container')
      .appendChild(
        Card.createElementCard(
          'span',
          'place-card__like-counter',
          `${this.cardParametrs.likes.length}`
        )
      );

    if (this.cardParametrs.owner._id === this.profileOwner._id) {
      placeCard
        .querySelector('.place-card__delete-icon')
        .classList.add('place-card__delete-icon_owner');
    }
    return placeCard;
  }

  like() {
    if (!this.likeButton.classList.contains('place-card__like-icon_liked')) {
      this.likeCard(this.cardParametrs._id, 'PUT', this.card);
    } else {
      this.likeCard(this.cardParametrs._id, 'DELETE', this.card);
    }
  }

  remove() {
    const openDialog = confirm('Вы действительно хотите удалить карточку?');
    if (openDialog) {
      this.deleteCard(this.cardParametrs._id, this.card);
    }
  }

  openTrueImg(event) {
    if (!event.target.classList.contains('place-card__delete-icon')) {
      this.imagePopupOpen();
      const img = new Image();
      img.src = this.cardParametrs.link;
      document.querySelector('.popup__content_img').setAttribute(
        'style',
        `width: ${img.naturalWidth}px; 
     height: ${img.naturalHeight}px; 
     background-image: url(${this.cardParametrs.link});`
      );
    }
  }
}
