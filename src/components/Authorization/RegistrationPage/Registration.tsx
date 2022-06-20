import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Registration.css"
import { focusEnd } from '../../Helpers/FocusEnd'
import { Api } from '../../../services/Api'

const Registration = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("")
  const [loginInputValue, setloginInputValue] = useState<string>('')
  const [passwordInputValue, setPasswordInputValue] = useState<string>('')
  const [secondPasswordValue, setSecondPasswordValue] = useState<string>('')
  const [userRegistredMessage, setUserRegistredMessage] = useState<string>('')
  const navigate = useNavigate()
  const api = new Api()
 

  function chekUser(userName: string, passwordInputValue: string, secondPasswordValue: string) {

    if (passwordInputValue === "") {
      setLoginErrorMessage("Поле логин не должно быть пустым")
      return
    } else if (passwordInputValue !== secondPasswordValue) {
      setPasswordErrorMessage("Неправильно набран второй пароль")
      return
    } else if (passwordInputValue === "" || passwordInputValue.length < 8) {
      setPasswordErrorMessage("Пароль не должен быть пустым и меньше 8 символов")
      return
    }
    let userRegistred: boolean = false;

    const user = api.getCurrentUserDataPromise(userName)
    user.then(userArray => {
      if (userArray.length) {
        userRegistred = false
        setUserRegistredMessage("Такой пользователь зарегистрирован")
        return
      } else {
        userRegistred = true
        api.sendRegistrationData(loginInputValue, passwordInputValue)
        navigate("/login")
        return
      }
    });
  }

  return (
    <div className='authorization'>
      <div className='registration'>
        <h2 className='registration__title'>Регистрация</h2>
        <div className="registration__flex-container">

          <span className='registration__error-span'>{userRegistredMessage}</span>

          <span>Имя пользователя</span>
          <p>{loginErrorMessage}</p>
          <input
            onBlur={(e) => focusEnd(e, setLoginErrorMessage)}
            onFocus={() => setLoginErrorMessage('')}
            value={loginInputValue}
            onChange={(e) => setloginInputValue(e.target.value)}
            className='registration__name-input'
            type="text"
            placeholder='Введите имя пользователя' />

          <span>Пароль</span>
          <p >{passwordErrorMessage}</p>
          <input
            onBlur={(e) => focusEnd(e, setPasswordErrorMessage)}
            onFocus={() => setPasswordErrorMessage('')}
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
            className='registration__password-input'
            type="password"
            placeholder='Введите пароль' />

          <span>Повторите пароль</span>
          <p>{passwordErrorMessage}</p>
          <input
            onBlur={(e) => focusEnd(e, setPasswordErrorMessage)}
            onFocus={() => setPasswordErrorMessage('')}
            value={secondPasswordValue}
            onChange={(e) => setSecondPasswordValue(e.target.value)}
            className='registration__password-input'
            type="password"
            placeholder='Повторите пароль' />

          <button
            onClick={() => { chekUser(loginInputValue, passwordInputValue, secondPasswordValue) }
            }
            className='registration__submit-button'>
            Зарегистрироваться</button>
          <button className='authorization_change-page-button' onClick={() => navigate("/login")}>
            Уже есть аккаунт? Войдите
          </button>

        </div>
      </div>
    </div>
  )
}

export default Registration