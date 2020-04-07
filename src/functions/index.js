import axios from 'axios'

// const API_DOMAIN =`${process.env.URL_PANIC_WEB}`

const API_URLS = {
    'USERS': 'http://35.215.210.191:3333' + '/users',
    'HELPS': 'http://35.215.210.191:3333' + '/help'
}
let token = localStorage.getItem('user_token')

export class User {
    constructor() {
    }

    //Listar usuário pelo ID
    get_users = () => axios.get(API_URLS.USERS, { headers: { "Authorization": `Bearer ${token}`  } })

    
}

export class Help {
    constructor() {

    }

    get_helps = () => axios.get(API_URLS.HELPS, { headers: { "Authorization": `Bearer ${token}`  } })
}

// export function getServices() {
//     return axios.get(API_URLS.GET_SERVICES)
// }