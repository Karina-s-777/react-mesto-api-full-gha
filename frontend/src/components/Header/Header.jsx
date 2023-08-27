import React from "react";
import vectorLogo from "../../images/Vector-logo.svg";
import { Link } from "react-router-dom";

function Header({ name, isEmail }) {
  function onSignOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header page__header">
      <img
        src={vectorLogo}
        alt="логотип социальной сети"
        className="header__logo"
      />
      {name === "signup" ? (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      ) : name === "signin" ? (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      ) : (
        <div className="header__exit-container">
          <p className="header__email">{isEmail}</p>
          <Link to="/signin" onClick={onSignOut} className="header__butten">
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
