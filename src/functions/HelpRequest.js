import { API } from "./API"
import axios from 'axios'

export class Session {
    constructor(){
    }

    get_session = () => axios.get(API.URL+'/help')
}