export interface IState {
    name: string,
    password: string,
    contacts: Array<IContacts>,
    id:number
}

export interface UserAction  {
    type: string,
    newUserData: {
        name: string ,
        id: number,
        password: string,
        contacts: Array<IContacts>,
    }
    changedContact: IContacts,
    newContactData: IContacts
    deleteElement: string,
}

export interface IContacts {
    name:string,
    id: number
    phoneNumber?: string 
    oldPhoneNumber?: string | undefined
}

export interface UserBox {
    name:string,
    password:string,
    contacts: Array<IContacts>,
    id:number
}