// const baseUrl = "https://api.karina.nomoredomainsicu.ru"
const baseUrl = "http://localhost:3000"
// добавляем функцию, общую для всех запросов, как в api
function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}  ${res.statusText}`);
  }

//   запрос для регистрации в нашем сервисе
  export function auth(password, email) {
    return fetch (`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            password: password,
            email: email,
        })
    })
    .then(res => 
      getResponseData(res) 
      )
  }

//   запрос для авторизации в нашем сервисе
  export function authorization (password, email) {
    return fetch (`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email,
        })
    })
    .then(res => getResponseData(res) )
  }

//   запрос для проверки валидности токена и получения email для вставки в шапку сайта:
  export function getUserData (token) {
    return fetch (`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            'Content-Type' : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res => getResponseData(res) )
  }