import axios from '../utils/axiosInstance';
import { ADD_MENU, DELETE_MENU } from './types';
import toastr from '../utils/toastrInstance';

export const addMenu = menu => async dispatch => axios.post('/menu', menu)
  .then(() => {
    dispatch({ type: ADD_MENU });
    toastr.success('Menu added successfully.');
  })
  .catch(() => toastr.error('Failed to add menu'));

export const deleteMenu = id => async dispatch => axios.delete(`/menu/${id}`)
  .then(() => {
    dispatch({ type: DELETE_MENU, payload: id });
    toastr.success('Menu deleted successfully.');
  }).catch(() => toastr.error('Failed to delete menu.'));
