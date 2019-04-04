import axios from 'axios';

const authBaseUrl = 'http://localhost:3000';
export default {
  login(user) {
    return axios.post(authBaseUrl + '/login', user);
  },
  register(user) {
    return axios.post(authBaseUrl + '/register', user);
  },
  setAuthHeaderToken(token) {
    axios.default.headers.common['Authorization'] = token;
  },
  deleteAuthHeaderToken() {
    delete axios.defaults.headers.common['Authorization'];
  }
};
