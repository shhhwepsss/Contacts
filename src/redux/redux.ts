import { type } from "os";
import { combineReducers, createStore } from "redux";
import { updateUserBox } from "../components/Helpers/updateUserBox";
import { IState, IContacts, UserAction } from "../Interfaces/Interfaces"; 

const initialState: IState  = {
    name: "",
    password: "",
    contacts: [],
    id: 1
}

const reducer = (state = initialState, action: UserAction) => {
    switch (action.type ) {
        case "SET_USER_DATA":
            const {name, password, contacts,id} = action
            return state = {...state, name, password, contacts, id}
        case "DELETE_USER_CONTACT":
            state.contacts.map( (item, index) => {
                if(action.deleteElement === item.phoneNumber){    
                    return state.contacts.splice(index,1)
                }
            })
            return state = {...state}
        case "ADD_USER_CONTACT":
                state.contacts.push(action.newContact)
                return state = {...state}
        case "CHANGE_USER_CONTACT":
                state.contacts.map((item)=> {
                    if(item.phoneNumber === action.changedContact.oldPhoneNumber){
                        item.phoneNumber= action.changedContact.phoneNumber;
                        item.name = action.changedContact.name
                    }
                    return item
            })
            return {...state}
        default:
            return state;
    }
}

export const store = createStore(reducer);