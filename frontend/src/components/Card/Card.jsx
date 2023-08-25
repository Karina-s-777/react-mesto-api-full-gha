import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LikeButton from "../LikeButton/LikeButton.jsx";

function Card({ card, onCardClick, onDelete, onCardLike }) {
   // подключаем контекст
  
  const currentUser = useContext(CurrentUserContext);

  // // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // const cardLikeButtonClassName = `elements__heart ${
  //   isLiked ? "elements__heart_active" : ""
  // } '}`;

  return (
    <>
      {/* определение id для попапа удаления карточки. Далее аргумента card._id берется индивидуально от каждой карточки Card.
    И далее через main попадает в App в setDeleteCardId*/}
      {currentUser._id === card.owner && 
        <button
          className="elements__trash"
          type="button"
          onClick={() => {onDelete(card._id)}}
        />
      }
      <img
        src={card.link}
        className="elements__mask-group"
        alt={`Изображение ${card.name}`}
        /* делаем так, чтобы в объект сразу прилетали имя и ссылка карточки, на которую щелкнули  */
        onClick={() => onCardClick({ name: card.name, link: card.link })}
      />
      <div className="elements__reaction">
        <h2 className="elements__mesto-name">{card.name}</h2>
        <LikeButton
          card={card}
          mypersonalid={currentUser._id}
          onCardLike={onCardLike}
        ></LikeButton>
      </div>
    </>
  );
}

export default Card;
