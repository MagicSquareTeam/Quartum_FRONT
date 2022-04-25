import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://quartum.herokuapp.com/api/user/';
const API_URL_LOCAL = 'http://localhost:8080/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', {headers: authHeader()});
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', {headers: authHeader()});
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', {headers: authHeader()});
  }

  getUserDate(id){
    return axios.get(API_URL_LOCAL + 'getSubsArticles/' + id, {headers: authHeader()})
  }
}

export default new UserService();
