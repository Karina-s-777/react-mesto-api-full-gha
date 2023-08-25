import Form from "../Form/Form";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Register({ name, onRegister }) {
  const { values, handleChange } = useFormValidation();

  //  // при нажатии кнопки «Сохранить» данные должны отправляться на сервер
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onRegister(values.password, values.email);
  }

  return (
    <section className="auth">
      <div
        className="popup__container popup__container_authorization auth__container"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="auth__title">
          {" "}
          {name === "signup" ? "Регистрация" : "Вход"}
        </h2>
        <Form
          name={name}
          title="Регистрация"
          nameButton="Зарегистрироваться"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            id="email"
            name="email"
            className="popup__input popup__input-authorization"
            placeholder="Email"
            required=""
            value={values.email ? values.email : ""}
            onChange={handleChange}
          />
          <span className="popup__input-error input-name-error"></span>
          <input
            type="password"
            id="password"
            name="password"
            className="popup__input popup__input-authorization"
            placeholder="Пароль"
            required=""
            value={values.password ? values.password : ""}
            onChange={handleChange}
          />
          <span className="popup__input-error input-name-error"></span>
        </Form>
      </div>
    </section>
  );
}


