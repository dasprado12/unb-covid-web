import axios from 'axios';
import endpoint from "../config/endpoint";


export class Session {
    constructor(){
    }

    get_session = (data) =>  axios.post(endpoint.get('session'), data)

    return_user(){
        let name = localStorage.getItem('user_name')
        let id = localStorage.getItem('user_id')
        let email = localStorage.getItem('user_email')
        let whatsapp = localStorage.getItem('user_whatsapp')
        let token = localStorage.getItem('user_token')
        let user = {
            "name": name,
            "id": id,
            "email": email,
            "whatsapp": whatsapp,
            "token": token,
        }
        return user
    }
}