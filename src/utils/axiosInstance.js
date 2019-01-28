import axios from 'axios';
import authUtils from './auth';

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use((config) => {
  const conf = { ...config };
  conf.headers.Authorization = authUtils.getToken();
  return conf;
});

instance.interceptors.response.use(res => res, error => Promise.reject(error.response.data));

export default instance;
