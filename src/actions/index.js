import axios from '../utils/axiosInstance';
import types from './types';
import authUtils from '../utils/auth';

const {
  GET_ALL_MENU, SIGN_UP, GET_USER, LOG_OUT,
} = types;

export const getAllMenu = () => async (dispatch) => {
  const { data } = await axios('/menu');
  dispatch({ type: GET_ALL_MENU, payload: data });
};

export const signUp = formData => dispatch => axios
  .post('/auth/signup', formData)
  .then(({ data: { token, ...user } }) => {
    authUtils.saveToken(token);
    dispatch({ type: SIGN_UP, payload: { user } });
  })
  .catch(({ response: { data: { message } } }) => dispatch({ type: SIGN_UP, payload: message }));

export const getCurrentUser = () => dispatch => axios
  .get('/users/me')
  .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
  .catch(() => dispatch({ type: GET_USER }));

export const logoutUser = () => {
  authUtils.removeToken();
  return { type: LOG_OUT };
};
