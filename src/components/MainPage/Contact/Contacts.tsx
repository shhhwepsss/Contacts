import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Contact.css"
import closeButton from "./../../../images/closeButton.jpg"
import { IState, IContacts } from '../../../Interfaces/Interfaces'; 
import { updateUserBox } from '../../Helpers/updateUserBox';

type ContactProps = {
  name: string,
  phoneNumber?: string
}

function Contacts({ name, phoneNumber }: ContactProps) {
  const oldPhoneNumber = useRef<HTMLParagraphElement>(null)
  const dispatch = useDispatch()
  const [newContactName, setNewContactName] = useState<string>('')
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const modaleWindow = useRef<HTMLDivElement>(null)
  const userStore = useSelector<IState, IState>( store => store )
  
  function deleteContact(phoneNumber:string | undefined, user:IState) {
    dispatch({ type: "DELETE_USER_CONTACT", deleteElement: phoneNumber })
    const userBox = {
      name:user.name,
      password: user.password ,
      contacts: user.contacts,
      id:user.id
    }
    
    updateUserBox(userBox)
  }

  function closeWindow(window: React.RefObject<HTMLDivElement>) {
    window.current?.classList.remove("contact__modalWindow-active")
    window.current?.classList.add("contact__modalWindow-static")
  }
  function openWindow(window: React.RefObject<HTMLDivElement>){
    window.current?.classList.add("contact__modalWindow-active")
    window.current?.classList.remove("contact__modalWindow-static")
  }

  function saveContactData(newContactName:string,newContactPhoneNumber:string, oldPhoneNumber:React.RefObject<HTMLParagraphElement>,user:IState){
    if(!newContactName || !newContactPhoneNumber) return setErrorMessage("Заполните поля!")
    const changedContact: IContacts = {
      name: newContactName,
      id: Date.now(),
      phoneNumber: newContactPhoneNumber,
      oldPhoneNumber: oldPhoneNumber.current?.innerHTML,
    }
    dispatch({type:"CHANGE_USER_CONTACT", changedContact})
    
    closeWindow(modaleWindow);
    const userBox = {
      name:user.name,
      password: user.password ,
      contacts: user.contacts,
      id:user.id
    }
    updateUserBox(userBox)
  }
  
  return (
    <div className="contact">
      <div className="contact__info-block">
        <p className='contact__paragraph'>{name}</p>
        <p className='contact__paragraph' ref={oldPhoneNumber}>{phoneNumber}</p>
      </div>
      <div className="contact__buttons-container">
        <button className="contact__change-button contact__button" onClick={(e) => openWindow(modaleWindow)}>Изменить контакт</button>
        <button className="contact__delete-button contact__button" onClick={(e) => deleteContact(phoneNumber,userStore)}> Удалить контакт</button>
      </div>
      <div ref={modaleWindow} className="contact__modalWindow-static">
        <div className="main-page__writeContact-block">
          <p className='contact__modalWindow-active-paragraph'>Новое имя контакта</p>
          <input
            className='contact__modalWindow-active-input'
            placeholder='Имя контакта'
            type="text"
            value={newContactName}
            onChange={(e) => setNewContactName(e.currentTarget.value)}
            onFocus={() => setErrorMessage("")}
            
          />
        </div>

        <div className="main-page__writePhoneNumber-block">
          <p className='contact__modalWindow-active-paragraph'>Новый номер контакта</p>
          <input
            className='contact__modalWindow-active-input'
            placeholder='Номер телефона контакта'
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.currentTarget.value)}
            onFocus={() => setErrorMessage("")}
            type="text"
          />
        </div>
        <p>{errorMessage}</p>
        <button className='main-page__save-contact-button' onClick={() => saveContactData( newContactName, newPhoneNumber, oldPhoneNumber, userStore) } >Сохранить </button>
        <button> <img onClick={() => closeWindow(modaleWindow)} className="main-page__modal-window__button" src={closeButton} alt="" /></button>
      </div>
    </div>
  )
}

export default Contacts
