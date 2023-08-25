import React from "react";

// isValid={true} по умолчанию, чтобы не распространялся false на попап удаления
function Popup({ name, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>

      <div className={`popup__container ${(name === "successful || error") && "popup__container_successful"}`} 
      onClick={(event => event.stopPropagation())}>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        {/* тут будет form в попап с формой*/}
        {children}
    </div>
    </div>
        );
 }

 export default Popup;
