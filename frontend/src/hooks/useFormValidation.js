// хук useFormValidation будет управлять value инпута в EditProfilePopup (вместо предложенных  стейт-переменных name и description )
import { useCallback, useState } from "react";
export default function useFormValidation() {
  // стейт отвечает за все value ипута
  const [values, setValues] = useState({});
  // стейт отвечает за сообщение ошибки - validation message. Будет пустым объектом сперва. И по имени инпута будем класть сюда ошибку
  const [errors, setErrors] = useState({});
  // стейт отвечает за валидость формы. Например, когда он false. кнопка не работает
  const [isValid, setIsValid] = useState(false);
  // стейт для подчеркивания неверного input, то есть для валидности конкретно инпут
  const [isInputValid, setIsInputValid] = useState({});

  // console.log(isValid);

  // создаем новый обработчик, обрабатывающий изменения указанного элемента
  function handleChange(e) {
    // срабатывает на том input, в который мы что-то вводим, выводя его к консоль

    const name = e.target.name
    // значение поля инпута, которое мы вводим "сейчас"
    const value = e.target.value
    // значение ошибки
    const validationMessage = e.target.validationMessage
    // записывает свойства validaty value интупа. 
    const valid = e.target.validity.valid
    // отвечает за вывод всей формы
    const form = e.target.form

    // Функуция получает старые данные/значения из нашего стейта/объекта values, внутри деструктурируем, раскладывая на свойства.
    // Если он пустой, в него запишутся свойства интута name и about по имени самого INPUT. То есть, мы вводим данные в форму сперва в имени, например,
    // далее в описании (about/job). И в консоль каждый раз выводятся новые данные вместе с предыдущими
    setValues((previousValues) => {
      return { ...previousValues, [name]: value };
    })
    // Здесь происходит то же самое, только тут по имени input`a появится значение validationMessage: "Текст должен быть не короче 2 симв. Длина текста сейчас: 1 символ."
    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: validationMessage };
    })

    // Берем форму и проверяем через метод checkValidity(), есть ли у элемента какие-либо ограничения и удовлетворяет ли он им.
    // Если элемент не соответствует своим ограничениям, браузер запускает отменяемое invalidсобытие для элемента, а затем возвращает значение false.
    setIsValid(form.checkValidity())

    // По имени input`a появится значение valid (false или true):при невалидном значении 1-ого инпута в  объекте появляется его значение с false
    // отдельно от второго. Если во 2-ом инпуте валидное значение, то там будет true. Но в первом также останется false, пока и оно ни станет валидным
    setIsInputValid((previousIsInputValid) => {
      return { ...previousIsInputValid, [name]: valid };
    })
  }
// Назначаем функцию, которая будет возвращать первоначальные значения. Если ничего не приходит в reset, data = {}
  function reset(data = {}) {
   // Здесь мы на будущее оставляем первоначальное значение не пустям, т.к. по условию при открытии попапа ред. профиля инпуты должны быть заполнены
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }

  // Функция устанавливает первоначальные данные. В зависимости от имени будет присваиваться Value
  const setValue = useCallback((name, value) => {
    setValues((previousValues) => {
      // [строка] : Значение
      return { ...previousValues, [name]: value };
    })
    
   }, [])
   
  return {values, errors, isValid, isInputValid, handleChange, reset, setValue };
}
