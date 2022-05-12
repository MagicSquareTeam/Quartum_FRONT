import axios from 'axios';
import authHeader from './auth-header';

const API_URL_LOCAL = 'http://localhost:8080/api/media/';

export class MediaService {
  static uploadProfilePhoto(file) {
    return axios.post(API_URL_LOCAL+ 'upload/profilePhoto', {
      name: 'asdf',
      creationDate: new Date(),
      file: file
    }, {headers: authHeader()})
  }
}

export default new MediaService();
