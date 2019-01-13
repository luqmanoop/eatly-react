import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';
import {
  GET_ALL_MENU, SIGN_UP, LOG_IN, GET_CURRENT_USER, LOG_OUT,
} from './types';

export const getAllMenu = () => async (dispatch) => {
  const { data } = await axios('/menu');
  dispatch({ type: GET_ALL_MENU, payload: data });
};

export const getCurrentUser = () => dispatch => axios
  .get('/users/me')
  .then(({ data }) => dispatch({ type: GET_CURRENT_USER, payload: data }))
  .catch(() => dispatch({ type: GET_CURRENT_USER }));

export const signUp = formData => dispatch => axios
  .post('/auth/signup', formData)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: SIGN_UP, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: SIGN_UP, payload: { error } }));

export const login = credentials => dispatch => axios
  .post('/auth/login', credentials)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: LOG_IN, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: LOG_IN, payload: { error } }));

export const logoutUser = () => {
  authUtils.removeToken();
  return { type: LOG_OUT };
};
