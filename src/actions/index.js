import axios from '../utils/axiosInstance';
import { default as types } from './types';
const { GET_ALL_MENU } = types;

export const getAllMenu = () => async dispatch => {
  const { data } = await axios.get('/menu');
  dispatch({ type: GET_ALL_MENU, payload: data });
};
