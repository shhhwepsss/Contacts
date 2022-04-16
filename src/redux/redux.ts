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
            return state = {...state, name: action.name, password: action.password, contacts: action.contacts, id:action.id}
            break;
        case "DELETE_USER_CONTACT":
            state.contacts.map( (item, index) => {
                if(action.deleteElement === item.phoneNumber){    
                    return state.contacts.splice(index,1)
                }
            })
            return state = {...state}
            break;
        case "ADD_USER_CONTACT":
                state.contacts.push(action.newContact)
                return state = {...state}
            break;    
        case "CHANGE_USER_CONTACT":
                state.contacts.map((item,index)=> {
                    if(item.phoneNumber === action.changedContact.oldPhoneNumber){
                        item.phoneNumber= action.changedContact.phoneNumber;
                        item.name = action.changedContact.name
                    }
                    return item
            })
            return {...state}
            break;   
        default:
            return state;
            break;
    }
}

export const store = createStore(reducer);
