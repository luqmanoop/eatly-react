import axios from '../utils/axiosInstance';
import { ADD_MENU } from './types';
import toastr from '../utils/toastrInstance';

export const d = () => {};

export const addMenu = menu => async dispatch => axios.post('/menu', menu)
  .then(() => {
    dispatch({ type: ADD_MENU });
    toastr.success('Menu added successfully.');
  })
  .catch(() => toastr.error('Failed to add menu'));
