export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;

    this.profileUrl = '/users/me';
    this.cardsUrl = '/cards';
    this.cardsLikeUrl = '/like';
  }

  getProfileOwner() {
    return fetch(this.baseUrl + this.profileUrl, this.headers)
      .then(res => res.json())
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl + this.cardsUrl, this.headers)
      .then(res => res.json())
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }

  patchProfileOwner(item, path) {
    const objJSON = {};
    objJSON.method = 'PATCH';
    objJSON.headers = this.headers.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.profileUrl + path, objJSON)
      .then(data => {
        if (data.ok) return data;
      })
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }

  deleteCardFromServer(cardId) {
    const objJSON = {};
    objJSON.method = 'DELETE';
    objJSON.headers = this.headers.headers;
    return fetch(this.baseUrl + this.cardsUrl + `/${cardId}`, objJSON)
      .then(data => {
        if (data.ok) return data;
      })
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }

  postCardOnServer(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.cardsUrl, objJSON)
      .then(res => {
        if (res.ok) return res.json();
      })
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }

  likeCardOnServer(cardId, queryMethod) {
    const objJSON = {};
    objJSON.method = queryMethod;
    objJSON.headers = this.headers.headers;
    return fetch(this.baseUrl + this.cardsUrl + this.cardsLikeUrl + `/${cardId}`, objJSON)
      .then(res => {
        if (res.ok) return res.json();
      })
      .catch(err => {
        alert('Ошибка: ' + err);
      });
  }
}
