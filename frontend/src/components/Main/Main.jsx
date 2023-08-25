import React, { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";

/* добавили в компонент PopupWithForm пропc isOpen, на основе которого в JSX задается CSS-класс, отвечающий за видимость попапа */
function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
  onCardLike,
  name,
  onLogin,
  onRegister,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      {name === "main" ? (
        <>
          <section className="content__profile profile">
            <div className="profile__person">
              <button className="profile__button-avatar" onClick={onEditAvatar}>
                <img
                  src={currentUser.avatar ? currentUser.avatar : "#"}
                  className="profile__avatar"
                  alt="Фотография пользователя"
                />
              </button>
              <div className="profile__info">
                <div className="profile__user">
                  <h1 className="profile__user-name">
                    {currentUser.name ? currentUser.name : " "}
                  </h1>
                  <button
                    className="profile__edit-button"
                    type="button"
                    onClick={onEditProfile}
                  />
                </div>
                <p className="profile__user-info">
                  {currentUser.about ? currentUser.about : " "}
                </p>
              </div>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            />
          </section>
          <section className="elements content__elements">
            <ul className="elements__items">
              {cards.map((card) => (
                /* выбираем в качестве ключа id карточки */
                <li className="elements__element" key={card._id}>
                  {/* Передаем onCardClick в Card внутри Main */}
                  <Card
                    card={card}
                    onCardClick={onCardClick}
                    onDelete={onDelete}
                    onCardLike={onCardLike}
                  />
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : name === "signup" ? (
        <Register onRegister={onRegister} name={name}></Register>
      ) : (
        <Login onLogin={onLogin} name={name}></Login>
      )}
    </main>
  );
}

export default Main;
