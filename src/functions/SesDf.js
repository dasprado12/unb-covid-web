import axios from 'axios'

const API_URLS = {
    'REGIONS': 'http://localhost:9000/api/regions',
}

export class Regions {
    get = () => axios.get(API_URLS.REGIONS)

}