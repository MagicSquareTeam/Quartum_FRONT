import axios from 'axios';

const API_URL_PUBLIC_DEBUG = 'http://localhost:8080/api/public/';

export class MetaService {
  getAllTags() {
    return axios.get(API_URL_PUBLIC_DEBUG + 'getAllTags')
      .then(
        response => {
          localStorage.setItem('tags', JSON.stringify(response.data));
          return response.data;
        })
  }
}

export default new MetaService();
