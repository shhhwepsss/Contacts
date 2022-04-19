
import { UserBox } from '../../Interfaces/Interfaces'


export class Api {

    getCurrentUserDataPromise = async (userName: string) => {
        const userPromise = await fetch(`http://localhost:3001/users?q=${userName}`);
        return await userPromise.json()
    }

    sendRegistrationData(name:string, password:string) {
        const readyObject = {
            name,
            password,
            contacts: []
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3001/users", true)
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(readyObject));
    }

    updateUserBox = async (userBox:UserBox) => {
        const xhr = new XMLHttpRequest()
        xhr.open("PATCH", `http://localhost:3001/users/${userBox.id}`)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(userBox))
    }
}