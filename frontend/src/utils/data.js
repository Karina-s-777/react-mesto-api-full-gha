const initialCards = [
  {
    nameImage: "Рыбная деревня",
    link: "https://images.unsplash.com/photo-1677824674891-2dec1567166a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
  },
  {
    nameImage: "Балтийское море",
    link: "https://images.unsplash.com/photo-1677842414130-946da7dcc736?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    nameImage: "Куршская коса",
    link: "https://images.unsplash.com/photo-1631472430498-4669ea970d84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
  },
  {
    nameImage: "Зеленоградск",
    link: "https://images.unsplash.com/photo-1612170088766-ee95e1bbf2ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    nameImage: "Зеленоградск",
    link: "https://images.unsplash.com/photo-1641926362213-d3f6f78ef6ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    nameImage: "Светлогорск",
    link: "https://images.unsplash.com/photo-1629104411440-7ebc9134f93e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];

/** вводим переменную popupElement, которой присваиваем селектор .popup*/
const popupElementGalery = document.querySelector(".popup_galery");
const popupElementProfile = document.querySelector(".popup_profile");
const popupElementAvatar = document.querySelector(".popup_avatar");
const popupElementDelete = document.querySelector(".popup_delete-card");

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//
const cardTemplateSelector = "#image-template";

const popupButtonOpenElementProfile = document.querySelector(
  ".profile__edit-button"
);
const popupButtonOpenElementGalery = document.querySelector(
  ".profile__add-button"
);

const popupButtonOpenElementAvatar  = document.querySelector(
  ".profile__button-avatar"
);


// вводим переменную = нашей форме попапа//
const formElementProfile = popupElementProfile.querySelector(".popup__form");
const formElementGalery = popupElementGalery.querySelector(".popup__form");
const formElementAvatar = popupElementAvatar.querySelector(".popup__form");

const profilePopupSelector = ".popup_profile";
const galeryPopupSelector = ".popup_galery";
const avatarPopupSelector = ".popup_avatar";
const deletePopupSelector = ".popup_delete-card";
const imagePopupSelector = ".popup_open-image-galery";
const listImageSelector = ".elements__items";

// ----------------- //
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-retention",
  inactiveButtonClass: "popup__button-retention_disabled",
  inputErrorClass: "popup__input_type_error",
  /* класс активации ошибки спан */
  errorClass: "popup__input-error_active",
};

const formInfoConfig = {
  nameUserInfo: ".profile__user-name",
  informationUserInfo: ".profile__user-info",
  avatar: ".profile__avatar",
};

export {
  initialCards,
  popupElementGalery,
  popupElementProfile,
  popupElementDelete,
  cardTemplateSelector,
  popupButtonOpenElementProfile,
  popupButtonOpenElementGalery,
  popupButtonOpenElementAvatar,
  formElementProfile,
  formElementGalery,
  formElementAvatar,
  profilePopupSelector,
  galeryPopupSelector,
  deletePopupSelector,
  avatarPopupSelector,
  imagePopupSelector,
  listImageSelector,
  validationConfig,
  formInfoConfig,
};
