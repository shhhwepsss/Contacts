
export async function sendRegistrationData(name:string, password:string) {
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