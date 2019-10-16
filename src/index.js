import Api from '../scripts/Api';
import Card from '../scripts/Card';
import CardList from '../scripts/CardList';
import PopupAvatar from '../scripts/PopupAvatar';
import PopupEdit from '../scripts/PopupEdit';
import PopupImage from '../scripts/PopupImage';
import PopupLoader from '../scripts/PopupLoader';
import PopupPlace from '../scripts/PopupPlace';

function main() {
  /* Константы */
  const baseUrl = 'http://95.216.175.5/cohort3';
  const authorizationKey = '14224aae-5367-4a26-9bdd-07fdc9139edf';

  const apiServer = new Api(baseUrl, {
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  // Объекты для работы с popups
  const popupPlace = new PopupPlace(
    document.querySelector('.popup-place'),
    document.querySelector('.user-info__button'),
    addCard
  );

  const editPopup = new PopupEdit(
    document.querySelector('.popup-edit'),
    document.querySelector('.user-info__button-edit'),
    patchProfile
  );

  const avatarPopup = new PopupAvatar(
    document.querySelector('.popup-avatar'),
    document.querySelector('.user-info__photo'),
    patchProfile
  );

  const imagePopup = new PopupImage(document.querySelector('.popup-image'));

  const loaderPopup = new PopupLoader(document.querySelector('.popup-loader'));

  // инициализация страницы
  // Мое второе я
  const profileOwner = {};

  // Добавление карточки
  // Достаем пременную Promise через метод then (2. Способ) callBack
  function addCard(item) {
    loaderPopup.open();
    apiServer
      .postCardOnServer(item)
      .then(card => {
        promiseCardList.then(cardList => cardList.addCard(card));
        loaderPopup.close();
      })
      .catch(err => {
        loaderPopup.close();
        alert('Ошибка: ' + err);
      });
  }

  // Открытие popup с рисунком callBack
  function imagePopupOpen() {
    imagePopup.open();
  }

  // Редактирование профиля callBack
  function patchProfile(item, path) {
    loaderPopup.open();
    apiServer
      .patchProfileOwner(item, path)
      .then(() => {
        if (path === '') {
          profileOwner.name = item.name;
          profileOwner.about = item.about;
          document.querySelector('.user-info__name').textContent = item.name;
          document.querySelector('.user-info__job').textContent = item.about;
          loaderPopup.close();
        }
        if (path === '/avatar') {
          document.querySelector('.user-info__photo').style.backgroundImage = `url(${item.avatar})`;
          loaderPopup.close();
        }
      })
      .catch(err => {
        loaderPopup.close();
        alert('Ошибка: ' + err);
      });
  }

  // Удаление карточки callBack
  function deleteCard(cardId, card) {
    loaderPopup.open();
    apiServer
      .deleteCardFromServer(cardId)
      .then(() => {
        card.parentNode.removeChild(card);
        loaderPopup.close();
      })
      .catch(err => {
        loaderPopup.close();
        alert('Ошибка: ' + err);
      });
  }

  // Лайк и дизлайк карточки callBack
  function likeCard(cardId, queryMethod, cardElement) {
    loaderPopup.open();
    apiServer
      .likeCardOnServer(cardId, queryMethod)
      .then(card => {
        cardElement.querySelector('.place-card__like-counter').textContent = card.likes.length;
        cardElement
          .querySelector('.place-card__like-icon')
          .classList.toggle('place-card__like-icon_liked');
        loaderPopup.close();
      })
      .catch(err => {
        loaderPopup.close();
        alert('Ошибка: ' + err);
      });
  }
  // Создание карточки callBack
  function newItemCreate(obj) {
    const newCard = new Card(obj, profileOwner, imagePopupOpen, deleteCard, likeCard);
    return newCard;
  }
  // Два способа достать [[PromiseValue]]
  // Загрузка профиля (1. Способ)
  // получаем ссылку на объект профиля переменную Promise

  loaderPopup.open();
  apiServer
    .getProfileOwner()
    .then(profile => {
      Object.assign(profileOwner, profile);
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${profile.avatar})`;
      document.querySelector('.user-info__name').textContent = profile.name;
      document.querySelector('.user-info__job').textContent = profile.about;
    })
    .catch(err => {
      loaderPopup.close();
      alert('Ошибка: ' + err);
    });

  // Загрузка карточек
  const promiseCardList = apiServer
    .getInitialCards()
    .then(cards => {
      loaderPopup.close();
      return new CardList(document.querySelector('.places-list'), cards, newItemCreate);
    })
    .catch(err => {
      loaderPopup.close();
      alert('Ошибка: ' + err);
    });
}

main();
