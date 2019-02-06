import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';
import { AUTHENTICATE, LOG_OUT } from './types';

export const getCurrentUser = () => dispatch => axios
  .get('/users/me')
  .then(({ data }) => dispatch({ type: AUTHENTICATE, payload: { user: data } }))
  .catch(() => dispatch({ type: AUTHENTICATE }));

export const signUp = formData => dispatch => axios
  .post('/auth/signup', formData)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: AUTHENTICATE, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(({ message }) => dispatch({
    type: AUTHENTICATE,
    payload: { error: { signup: message } },
  }));

export const login = credentials => dispatch => axios
  .post('/auth/login', credentials)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: AUTHENTICATE, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(({ message }) => dispatch({
    type: AUTHENTICATE,
    payload: { error: { login: message } },
  }));

export const logoutUser = () => {
  authUtils.removeToken();
  return { type: LOG_OUT };
};
