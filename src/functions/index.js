import axios from 'axios'

const API_URLS = {
    'USERS': 'http://35.215.210.191:3333' + '/users',
    'HELPS': 'http://35.215.210.191:3333' + '/help'
}
let token = localStorage.getItem('user_token')

export class User {
    constructor() {
    }

    get_users = () => axios.get(API_URLS.USERS, { headers: { "Authorization": `Bearer ${token}`  } })

    
}

export class Help {
    constructor() {

    }

    get_helps = () => axios.get(API_URLS.HELPS, { headers: { "Authorization": `Bearer ${token}`  } })
}