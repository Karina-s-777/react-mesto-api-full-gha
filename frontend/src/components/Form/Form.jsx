import React from "react";
import { Link } from "react-router-dom";

export default function Form({
  name,
  nameButton,
  children,
  isValid = true,
  onSubmit,
}) {
  return (
    <>
      <form
        className="popup__form"
        name={`popup-form-${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <fieldset
          className={`popup__contact-info ${
            name === "signin || signup" && "auth__fieldse"
          }`}
        >
          {children}
          <button
            type="submit"
            className={`popup__button-retention 
          ${name === "signin" && "popup__button-retention_authorization"} 
          ${name === "signup" && "popup__button-retention_authorization"} 
          ${isValid ? "" : "popup__button-retention_disabled"}`}
          >
            {nameButton}
          </button>
          {name === "signup" && (
            <Link to="/sign-in" className="popup__link-transition">
              Уже зарегистрированы? Войти
            </Link>
          )}
        </fieldset>
      </form>
    </>
  );
}