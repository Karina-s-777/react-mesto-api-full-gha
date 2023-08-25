class Api {
  constructor(options) {
    // this._headers = options.headers;
    this._url = options.baseUrl;
    // this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getUser(token) {
    return (
      fetch(`${this._url}/users/me`, {
        headers: {
          // 'Content-Type' : "applicatio/json",
            "Authorization" : `Bearer ${token}`
        },
      })
        /*then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res*/
        .then(this._checkResponse)
    );
  }

  getCards(token) {
    /* заправшиваем данные с указанного сервера с помощью fetch */
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
            "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  setNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type' : "application/json",
            "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.nameImage,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
          "Authorization" : `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
            "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.nameUser,
        about: data.aboutUser,
      }),
    }).then(this._checkResponse);
  }

  addLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
    },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.karina.nomoredomainsicu.ru",
});

export default api;