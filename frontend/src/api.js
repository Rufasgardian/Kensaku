import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/signup/';

export const signup = (userData) => {
  return axios.post(`${API_URL}signup/`, userData);
};
