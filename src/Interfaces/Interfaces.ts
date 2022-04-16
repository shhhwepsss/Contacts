
export interface IState {
    name: string,
    password: string,
    contacts: Array<IContacts>,
    id:number
}

export interface UserAction  {
    type: string,
    name: string ,
    id: number,
    password: string,
    contacts: Array<IContacts>,
    deleteElement: string,
    newContact: IContacts,
    changedContact: IContacts,
}

export interface IContacts {
    name:string,
    id: number
    phoneNumber?: string 
    oldPhoneNumber?: string | undefined
}
