import React from 'react'
import { IContacts } from '../../Interfaces/Interfaces'

interface UserBox {
    name:string,
    password:string,
    contacts: Array<IContacts>,
    id:number
}

export async function updateUserBox(userBox:UserBox) {
    const xhr = new XMLHttpRequest()
    xhr.open("PATCH", `http://localhost:3001/users/${userBox.id}`)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(userBox))
}
