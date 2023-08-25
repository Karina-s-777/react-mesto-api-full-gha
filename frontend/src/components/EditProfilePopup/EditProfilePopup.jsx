// добавляем обработку формы в окно редактирования профиля

import React, { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// Чтобы добавить обработку формы в окно редактирования профиля, сначала вынесите его в отдельный компонент из App:
// перенесите тег PopupWithForm вместе с содержимым. Добавьте новому компоненту пропсы isOpen и onClose и пробрасывайте их в PopupWithForm.

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Чтобы подставить в форму текущие значения, подпишитесь на контекст
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    // записываем строку nameUser со значение value - серверные значения name
    setValue("nameUser", currentUser.name);
    setValue("aboutUser", currentUser.about);
  }, [currentUser, setValue, isOpen]);
  //Также следим за isOpen (за состоянием открытости), чтобы вставлять в инпуты данные пользователя, иначе, если мы удалим информацию из инпутов 
  // и просто закроем попап, то при следующем открытии инпуты будут пустые (без данных пользователя)

  // функция, которая берет пропс onClose (изменяет видимость попапа) и вызывает её параллельно с reset с аргументом data.
  // в итоге после закрытия попапа профиля значения инпутов "восстанавливаются" до значений с сервера, а не остаются теми же, что после ввода и закрыти попапа
  function resetOnClose() {
    onClose();
    // когда попап начал закрываться, мы вызываем как раз reset с объектом setValues
    reset({ nameUser: currentUser.name, aboutUser: currentUser.about });
  }

  // при нажатии кнопки «Сохранить» данные должны отправляться на сервер
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(
      { nameUser: values.nameUser, aboutUser: values.aboutUser },
      reset
    );
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      nameButton="Сохранить"
      isOpen={isOpen}
      onClose={resetOnClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="input-name"
        name="nameUser"
        // При первой загрузке nameUser = undefined (т.к. мы задали пустой объект). Если isInputValid.nameUser === undefined,
        // то isInputValid.nameUser выведет пустую строку и наш инпут ещё не будет подсвечиваться красным. Иначе добавить класс ошибки
        className={`popup__input popup__input_type_name ${
          isInputValid.nameUser === undefined || isInputValid.nameUser
            ? ""
            : "popup__input_type_error"
        }`}
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        value={values.nameUser ? values.nameUser : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error input-name-error">
        {errors.nameUser}
      </span>
      <input
        type="text"
        id="input-about"
        name="aboutUser"
        className={`popup__input popup__input_type_about ${
          isInputValid.aboutUser === undefined || isInputValid.aboutUser
            ? ""
            : "popup__input_type_error"
        }`}
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
        value={values.aboutUser ? values.aboutUser : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error input-about-error">
        {errors.aboutUser}
      </span>
    </PopupWithForm>
  );
}
