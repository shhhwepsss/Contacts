
import { UserBox } from '../Interfaces/Interfaces'


export class Api {
    private _usersUrl: string = `http://localhost:3001/users` 
    getCurrentUserDataPromise = async (userName: string) => {
        try {
            const userPromise = await fetch(this._usersUrl + `?q=${userName}`);
            return await userPromise.json()
        } catch (error) {
            alert(error)
        }
    }

    sendRegistrationData(name:string, password:string) {
        try {
            const readyObject = {
                name,
                password,
                contacts: []
            }
            let xhr = new XMLHttpRequest();
            xhr.open("POST", this._usersUrl, true)
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(readyObject));
        } catch (error) {
            alert(error)
        }
    }

    updateUserBox = async (userBox:UserBox) => {
        try {
            const xhr = new XMLHttpRequest()
            xhr.open("PATCH", this._usersUrl + `/${userBox.id}`)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(userBox))
        } catch (error) {
            alert(error)
        }
    }
}