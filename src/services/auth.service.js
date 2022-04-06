import axios from 'axios';

const API_URL = 'https://quartum.herokuapp.com/api/auth/';
const API_URL_DEBUG = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL_DEBUG + 'signin', {
        // username/email
        login: user.login,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL_DEBUG + 'signup', {
      username: user.username,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
