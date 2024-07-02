import axios from 'axios';

// axios instance creation.
const instance = axios.create({
  baseURL: 'baseUrl',
});

export default instance;
