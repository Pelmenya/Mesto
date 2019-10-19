import createElementDOM from './fuctions';

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

    this.card = this.createCard();

    this.likeButton = this.card.querySelector('.place-card__like-icon');
    this.removeButton = this.card.querySelector('.place-card__delete-icon');
    this.cardImg = this.card.querySelector('.place-card__image');

    this.likeButton.addEventListener('click', this.like);
    this.removeButton.addEventListener('click', this.remove);
    this.cardImg.addEventListener('click', this.openTrueImg);
  }

  createCard() {
    const placeCard = createElementDOM('div', 'place-card');
    placeCard
      .appendChild(
        createElementDOM(
          'div',
          'place-card__image',
          false,
          `background-image: url(${this.cardParametrs.link});`
        )
      )
      .appendChild(createElementDOM('button', 'place-card__delete-icon'));
    placeCard
      .appendChild(createElementDOM('div', 'place-card__description'))
      .appendChild(createElementDOM('h3', 'place-card__name', this.cardParametrs.name));

    placeCard
      .querySelector('.place-card__description')
      .appendChild(createElementDOM('div', 'place-card__like-container'));

    placeCard
      .querySelector('.place-card__like-container')
      .appendChild(createElementDOM('button', 'place-card__like-icon'));

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
        createElementDOM('span', 'place-card__like-counter', `${this.cardParametrs.likes.length}`)
      );

    if (this.cardParametrs.owner._id === this.profileOwner._id) {
      placeCard
        .querySelector('.place-card__delete-icon')
        .classList.add('place-card__delete-icon_owner');
    }
    return placeCard;
  }

  like() {
    let indexProfileLikes;
    if (
      this.cardParametrs.likes.some((item, index) => {
        indexProfileLikes = index;
        return item._id === this.profileOwner._id;
      })
    ) {
      this.likeCard(this.cardParametrs._id, 'DELETE', this.card);
      this.cardParametrs.likes.splice(indexProfileLikes, 1);
    } else {
      this.likeCard(this.cardParametrs._id, 'PUT', this.card);
      this.cardParametrs.likes.push(this.profileOwner);
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
      this.imagePopupOpen(this.cardParametrs.link);
    }
  }
}
