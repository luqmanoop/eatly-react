import axios from 'axios';
import authUtils from './auth';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api/v1'
      : 'https://fastfood-fast.herokuapp.com/api/v1',
});

instance.interceptors.request.use((config) => {
  const conf = { ...config };
  conf.headers.Authorization = authUtils.getToken();
  return conf;
});

export default instance;
