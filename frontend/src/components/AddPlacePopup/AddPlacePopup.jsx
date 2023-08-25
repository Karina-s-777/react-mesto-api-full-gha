import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetOnClose() {
    onClose();
    reset();
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // обратились к тому, что лежит в input, взяли его значение value и отправили их на запрос
    onAddPlace({ nameImage: values.nameImage, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="galery"
      title="Новое место"
      nameButton="Создать"
      isOpen={isOpen}
      onClose={resetOnClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        id="nameImage"
        name="nameImage"
        className={`popup__input popup__input_type_name-image ${
          isInputValid.nameImage === undefined || isInputValid.nameImage
            ? ""
            : "popup__input_type_error"
        }`}
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={values.nameImage ? values.nameImage : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error nameImage-error">
        {errors.nameImage}
      </span>
      <input
        type="url"
        id="link"
        name="link"
        className={`popup__input popup__input_type_link ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        required=""
        value={values.link ? values.link : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error link-error">{errors.link}</span>
    </PopupWithForm>
  );
}
