import axios from 'axios';
import authUtils from './auth';

const instance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api/v1/',
});

instance.interceptors.request.use((config) => {
  const requestConfig = { ...config };
  requestConfig.headers.Authorization = authUtils.getToken();
  return requestConfig;
});


instance.interceptors.response.use(res => res, error => Promise.reject(error.response.data));

export default instance;
