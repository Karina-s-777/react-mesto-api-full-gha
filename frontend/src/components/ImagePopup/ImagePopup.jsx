import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_open-image-galery ${isOpen && "popup_opened"}` } onClick={onClose}
    >
      {/* Для остановки всплытия нужно вызвать метод event.stopPropagation(). */}
      <div className="popup__container-image" onClick={(event => event.stopPropagation())}>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__figure-image">
          {/* в разметке при первоначальной загрузке у тега img нет атрибута src, а у alt card.name = undefined. На всякий случай добавила условие */}
          <img
            src={card.link ? card.link : "#"}
            alt={card.name ? `Изображение ${card.name}` : "#"}
            className="popup__image-open"
          />
          <figcaption className="popup__text-open">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

// import React from "react";
// import Popup from "../Popup/Popup";

// function ImagePopup({ card, isOpen, onClose, name }) {
//   return (
//     <Popup name={open-image-galery} isOpen={isOpen} onClose={onClose} card={card}>
//       <figure className="popup__figure-image">
//         {/* в разметке при первоначальной загрузке у тега img нет атрибута src, а у alt card.name = undefined. На всякий случай добавила условие */}
//         <img
//           src={card.link ? card.link : "#"}
//           alt={card.name ? `Изображение ${card.name}` : "#"}
//           className="popup__image-open"
//         />
//         <figcaption className="popup__text-open">{card.name}</figcaption>
//       </figure>
//     </Popup>
//   );
// }

// export default ImagePopup;