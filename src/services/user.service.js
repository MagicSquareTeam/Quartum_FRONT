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

  getUserData(id){
    return axios.get(API_URL_LOCAL + 'getUserData/' + id, {headers: authHeader()})
  }

  saveUserData(user){
    return axios.post(API_URL_LOCAL + 'getUserData/' + id, {user},{headers: authHeader()})
  }
}

export default new UserService();
