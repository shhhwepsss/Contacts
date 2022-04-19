import { useDispatch, useSelector } from 'react-redux';
import "./MainPage.css"
import { IState } from '../../Interfaces/Interfaces'; 
import Contact from './Contact/Contacts';
import plus from "./../../images/plus-icon.jpg"
import React, { useRef, useState, useEffect, MutableRefObject, LegacyRef } from 'react';
import closeButton from "./../../images/closeButton.jpg"
import { useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';


const MainPage = () => {
  const user = useSelector<IState, IState>( store => store )
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!user.name || !user.password || !user.id) navigate("/registration")
  })
  
  const dispatch = useDispatch();
  const modalWindow = useRef<HTMLDivElement>(null)
  const [errorMessage, setErrorMesage] = useState<string>(' ')
  const [contactName, setContactName] = useState<string>('')
  const [contactPhoneNumber, setcontactPhoneNumber] = useState<string>('')
  const [sortedContacts, setSortedContact] = useState<JSX.Element[]>()
  const [isContactSorted, setIsContactSorted] = useState<boolean>(false)
  const api = new Api()

  const contacts = user.contacts.map( ( contact ) => {
    return <Contact key={contact.id} name={contact.name} phoneNumber={contact.phoneNumber} />
  })
  function openWindow(window:React.RefObject<HTMLDivElement>){
    window.current?.classList.remove("main-page__modal-window-static")
    window.current?.classList.add("active")
  }

  function closeWindow(window:React.RefObject<HTMLDivElement>){
    window.current?.classList.add("main-page__modal-window-static")
    window.current?.classList.remove("active")
  }

  function addNewContact(contactName:string,contactPhoneNumber:string, window:React.RefObject<HTMLDivElement>) {
   
    if(!contactName || !contactPhoneNumber){
      return setErrorMesage("Поля должны быть заполнены");
    }
    window.current?.classList.add("main-page__modal-window-static")
    window.current?.classList.remove("active")
    const newContactData = {
      id: Date.now(),
      name: contactName,
      phoneNumber: contactPhoneNumber
    }
    setIsContactSorted(false)
    dispatch({type: "ADD_USER_CONTACT", newContact: newContactData})
    const userBox = {
      name:user.name,
      password: user.password ,
      contacts: user.contacts,
      id:user.id
    }
    api.updateUserBox(userBox)
  }

  function sortContacts(e:React.ChangeEvent<HTMLSelectElement>){
    
    if(e.target.value === "dontSort") return setIsContactSorted(false)
    const sortedContacts = contacts.sort(function (a:JSX.Element , b:JSX.Element):number {
      if (a.props[e.target.value] < b.props[e.target.value]) {return -1}; 
      if (a.props[e.target.value] > b.props[e.target.value]){ return 1}; 
      return 0
    })
    setIsContactSorted(true)
    setSortedContact(sortedContacts)
  }

  return (
    <div className='main-page'>
      <h2 className="main-page__contact-title">Мои контакты</h2>
      <div className="main-page__contacts"> 
      <select className="main-page__select" onChange={(e)=> sortContacts(e)} name="" id="">
        <option value="dontSort" selected > Не сортировать</option>
        <option value="name">Сортировать по имени</option>
        <option value="phoneNumber"> сортировать по телефону</option>
      </select>
        {isContactSorted ? sortedContacts?.map(item => item) : contacts}
      </div>
      <button onClick={() => openWindow(modalWindow)}> <img src={plus} className='mainPage__add-contact-button' alt="" /></button>
      <div ref={modalWindow} className="main-page__modal-window-static">

        <div className="main-page__writeContact-block">
        <p className='main-page__modal-window__paragraph'>Введите имя нового контакта</p>
        <input 
        className='main-page__modal-window-input'
        placeholder='Имя контакта'
        type="text"
        value={contactName}
        onChange={(e) => setContactName(e.currentTarget.value)}
        onFocus={() => setErrorMesage("")}
        />
        </div>

        <div className="main-page__writePhoneNumber-block">
        <p className='main-page__modal-window__paragraph'>Введите номер нового контакта</p>
        <input 
        className='main-page__modal-window-input'
        placeholder='Номер телефона контакта'
        value={contactPhoneNumber}
        onChange={(e) => setcontactPhoneNumber(e.currentTarget.value)}
        type="text" 
        onFocus={() => setErrorMesage("")}
        />
        </div>
        <p>{errorMessage}</p>
        <button className='main-page__save-contact-button' onClick={() => addNewContact(contactName,contactPhoneNumber,modalWindow)}>Добавить контакт</button>
        <button> <img onClick={() => closeWindow(modalWindow)} className="main-page__modal-window__button" src={closeButton} alt="" /></button>
      </div>
    </div>
  )
}

export default MainPage;