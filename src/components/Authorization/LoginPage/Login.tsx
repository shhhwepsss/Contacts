import React, { useRef, useState } from 'react'
import "./Login.css"
import circle from "../../../images/circle.png"
import { useNavigate } from 'react-router-dom';
import { focusEnd } from '../../Helpers/FocusEnd';
import { useDispatch } from 'react-redux';
import { Api } from '../../../services/Api';

const SET_USER_DATA: string = "SET_USER_DATA";
 
const Login: React.FC = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("")
  const [loginInputValue, setloginInputValue] = useState<string>('')
  const [passwordInputValue, setPasswordInputValue] = useState<string>('')

  const loadCircle = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const api = new Api()
  

  async function chekUser(userName: string, loadCircle: React.RefObject<HTMLImageElement>, passwordInputValue: string,) {
    
    if (userName === "") {
      setLoginErrorMessage("Поле имя пользователя не должно быть пустым")
      return
    } else if (passwordInputValue === "") {
      setPasswordErrorMessage("Поле пароль должно не должно быть пустым")
      return
    }

    loadCircle.current!.classList.remove("loading-circle-static")
    loadCircle.current!.classList.add("loading-circle-active")
    
    api.getCurrentUserDataPromise(userName).then(userArrayData => {
      if (!userArrayData.length) {
        alert("Пользователь не зарегистрирован");
        navigate("/registration")
        return
      } else if (passwordInputValue === userArrayData[0].password) {
        const newUserData = {
          name: userArrayData[0].name, 
          password:userArrayData[0].password, 
          contacts: userArrayData[0].contacts, 
          id: userArrayData[0].id
        }
        dispatch({type: SET_USER_DATA, newUserData})
        navigate("/mainPage")
        return
      }if (passwordInputValue !== userArrayData[0].password) {
        setPasswordErrorMessage("Неверный пароль")
      }
    });
    loadCircle.current!.classList.remove("loading-circle-active")
    loadCircle.current!.classList.add("loading-circle-static")
  }

  return (
    <div className='authorization'>
      <div className='login'>
        <h2 className='login__title'>Вход</h2>
        <div className="login__flex-container">
          <img className='loading-circle-static' src={circle} alt="loading-circle" ref={loadCircle} />
          <span>Имя пользователя</span>
          <p style={{ color: "#5E1A29" }}>{loginErrorMessage}</p>
          <input
            value={loginInputValue}
            onChange={(e) => setloginInputValue(e.target.value)}
            onBlur={(e) => focusEnd(e, setLoginErrorMessage)}
            onFocus={() => setLoginErrorMessage('')}
            className='login__name-input'
            type="text"
            placeholder='Имя пользователя' />

          <span>Введите пароль</span>
          <p style={{ color: "#5E1A29" }}>{passwordErrorMessage}</p>
          <input
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
            onBlur={(e) => focusEnd(e, setPasswordErrorMessage)}
            onFocus={() => setPasswordErrorMessage('')}
            className='login__password-input'
            type="password"
            placeholder='Пароль' />
          <button onClick={() => chekUser(loginInputValue, loadCircle, passwordInputValue)} className='login__submit-button'>Войти</button> 
          <button className='login_change-page-button' onClick={() => navigate("/registration")}>
          Нет аккаунта? Зарегистрируйтесь
        </button>
        </div>
       
      </div>
    </div >
  )
}

export default Login