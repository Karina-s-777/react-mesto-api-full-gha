import React from "react";
import Popup from "../Popup/Popup";
import Form from "../Form/Form";

// isValid={true} по умолчанию, чтобы не распространялся false на попап удаления
function PopupWithForm({
  name,
  title,
  nameButton,
  children,
  isOpen,
  onClose,
  isValid = true,
  onSubmit,
}) {
  return (
    
    <Popup name={name} title={title} isOpen={isOpen} onClose={onClose}>
      <h2
        className={`popup__text-description ${
          name === "delete-card" && "popup__text-agreement"
        }`}
      >
        {title}
      </h2>

      <Form
        name={name}
        nameButton={nameButton}
        children={children}
        onSubmit={onSubmit}
        isValid={isValid}
      ></Form>
    </Popup>
  );
}

export default PopupWithForm;
