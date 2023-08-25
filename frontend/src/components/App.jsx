import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { auth, authorization, getUserData } from "../utils/auth.js";
import Header from "./Header/Header.jsx";
import Component from "./Component/Component.jsx";

function App() {
  /* Для начала перенесите добавленные обработчики событий из компонента Main в компонент App.
При этом, чтобы они продолжали вызываться из компонента Main,передавайте их в последний с помощью новых пропсов onEditProfile, onAddPlace и onEditAvatar
[state, setState] = хук useState()
Переменные состояния, отвечающие за видимость трёх попапов: isEditProfilePopupOpen и т.д. */

  const navigate = useNavigate();

  /* стейты попапов */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpenPopupsSuccess, setIsOpenPopupsSuccess] = useState(false);

  // const [isError, setIsError] = useState(false);


  /* Т.к. у нас есть анимация, пробуем добавить новый стейт для её активации и видимости попапа  */
  const [isImagePopup, setIsImagePopup] = useState(false);
  /* selectedCard - принимает объект при клики из карточки  */
  const [selectedCard, setSelectedCard] = useState({});
  /* стейты контекста */
  const [currentUser, setCurrentUser] = useState({});
  /* стейты карточки */
  /* стейт хранит массив карточек */
  const [cards, setCards] = useState([]);
  /* создаем стейт для определения остояняя id карточки для удаления карточки*/
  const [deleteCardId, setDeleteCardId] = useState(" ");
  /* стейт для логина/ не забыть поменять обратно на false */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmail, setIsEmail] = useState("");

  /* Перенесли обработчики событий из компонента Main в компонент App.
Чтобы они продолжали вызываться из компонента Main,передали их в последний с помощью новых пропсов onEditProfile, onAddPlace и onEditAvatar*/

  // useCallback— это React Hook, который позволяет кэшировать определение функции между повторными рендерингами.
  // React вернет (не вызовет!) вашу функцию обратно вам во время первоначального рендеринга
  // передаем определение функции, которую вы хотите кэшировать между повторными рендерингами и список зависимостей , включая каждое значение в вашем компоненте, которое используется внутри вашей функции

  // функция по установке значений всех стейтов через useCallback
  const setValuesOfAllStates = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsSuccess(false);
    setIsOpenPopupsSuccess(false);
  }, []);

  const closePopupByEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setValuesOfAllStates();
      }
    },
    [setValuesOfAllStates]
  );

  const closeAllPopups = useCallback(() => {
    setValuesOfAllStates();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setValuesOfAllStates, closePopupByEsc]);

  // таким образом, три ссылки на три функции с useCallback не изменятся

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopup ||
    isOpenPopupsSuccess

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen, closeAllPopups]);

  /* Заменили императивный код в обработчиках событий на код, который будет изменять значения соответствующих переменных состояния, 
задавая в них значение true. */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /* Функция открытия и закрытие попапа удаления */
  function handleDeletePopupClick(cardId) {
    setIsDeletePopupOpen(true);
    /* теперь делаем так, чтобы cardId был доступен для запроса на сервер и стейта. И обновлялся из Card  */
    setDeleteCardId(cardId);
  }

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setIsEmail(res.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(`Ошибка при обновлении ${err}`);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([api.getUser(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([dataUser, dataCard]) => {
          /* проходимся по dataCards и определеяем, на каких карточках нам надо отрисовывать мусорку, а на каких нет. Где mypersonalid - мой id, который мы присваиваем всем карточкам */
          dataCard.forEach((dataCard) => (dataCard.mypersonalid = dataUser._id));
          /* меняем state на нужное значение - присваиваем своим значениям пользователя (nameUser и т.д.) серверные соответствующие значения */
          setCurrentUser(dataUser);
          /* добавили второй запрос к API за соответствующими данными*/
          setCards(dataCard);
        })
        .catch((err) => console.error(`Ошибка ${err}`))
      }
   }, [isLoggedIn]);

  function handleCardDelete(event) {
    event.preventDefault();
    /* Делаем запрос на сервер deleteCard и внутрь кладем вместо пустой строки deleteCardId с cardId*/
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        // После запроса в API, обновляем стейт cards с помощью метода filter: создаем копию массива, исключив из него удалённую карточку.
        /* проходим по текущему состоянию cards методом filter и возвращаем id каждой карточки и сверяет с deleteCardId  */
        setCards(
          cards.filter((card) => {
            /* если card._id не равен id удаленной карточки, то мы её возвращаем, то есть не убираем со страницы*/
            return card._id !== deleteCardId; 
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при удалении карточки ${err}`));
  }

  /* принимает параметр card и кладет его в setSelectedCard */
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  /* Функция запрос. Сохраняем данные в API. Функция получает данные юзера dataUser и reset в полях инпутов */
  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser, localStorage.jwt)
      .then((res) => {
        /* Пришедшие данные мы сразу записали в состояние стейта - после завершения запроса обновляем стейт currentUser из полученных данных и закрываем все модальные окна. */
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка редактирования профиля ${err}`));
  }

  /* Функция запрос. Сохраняем данные в API в Avatar  */
  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAvatar(dataUser, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`));
  }

  // Добавляем обработчик handleAddPlaceSubmit. После завершения API-запроса внутри него обновляем стейт cards с помощью расширенной копии текущего
  // массива — используем оператор ...:
  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .setNewCard(dataCard, localStorage.jwt)
      .then((res) => {
        // первый элемент = возвращенный с сервера объект. Все остальные отрисовываются
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка при добавлении карточки ${err}`));
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // если isLike = true, то отправляем delete запрос на сервер при клике
    if (isLiked) {
      api
        .deleteLikeCard(card._id, localStorage.jwt)
        // тогда делаем для setIsLike false (лайк становится неактивным)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
          console.log(card._id)
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } // иначе при положительном запросе setIsLike(true) - лайк ставится
    else
      api
        .addLikeCard(card._id, localStorage.jwt)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
          console.log(card._id)
        })
        .catch((err) => console.error(`Ошибка при постановке лайка ${err}`));
  }



  function handleLogin(password, email) {
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsOpenPopupsSuccess(true);
        console.error(`Ошибка при авторизации ${err}`);
      });
  }

  function handleRegister(password, email) {
    auth(password, email)
      .then((res) => {
        setIsSuccess(true);
        setIsOpenPopupsSuccess(true);
        window.scrollTo(0, 0);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsOpenPopupsSuccess(true);
        console.error(`Ошибка при регистрации ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute element={Component}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDelete={handleDeletePopupClick}
                cards={cards}
                onCardLike={handleCardLike}
                isEmail={isEmail}
              />
            }
          ></Route>
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          nameButton="Да"
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="successful"
          title="Вы успешно зарегистрировались!"
          onClose={closeAllPopups}
          isOpen={isOpenPopupsSuccess}
          isSuccess={isSuccess}
        />

        {/* <InfoTooltip
          isSuccess={isSuccess}
          name="error"
          onClose={closeAllPopups}
          isOpen={isError}
        /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
