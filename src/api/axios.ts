import axios from 'axios';

// axios instance creation.
const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

export default instance;
