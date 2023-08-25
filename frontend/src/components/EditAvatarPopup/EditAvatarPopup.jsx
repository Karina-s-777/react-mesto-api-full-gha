import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  // хук useRef позволяем получить элемент прямо из DOM.
  const input = useRef();

  function resetOnClose() {
    onClose();
    reset();
  }

  // при нажатии кнопки «Сохранить» данные должны отправляться на сервер
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // обратились к тому, что лежит в input, взяли его значение value и отправили их на запрос
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      nameButton="Сохранить"
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetOnClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={input}
        type="url"
        id="avatar"
        name="avatar"
        className={`popup__input popup__input_type_avatar ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "popup__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        required=""
        value={values.avatar ? values.avatar : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}
