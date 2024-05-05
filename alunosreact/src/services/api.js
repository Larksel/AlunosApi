import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7260',
});

export default api;
