import React from "react";
import Popup from "../Popup/Popup";

export default function InfoTooltip({ isSuccess, name, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div
        className={`${isSuccess ? "popup__image-successful" : "popup__image-error"
        }`}
      />
      <h2 className={`popup__text-description popup__text-successful`}>
        {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}