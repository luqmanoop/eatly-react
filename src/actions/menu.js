import axios from '../utils/axiosInstance';
import {
  ADD_MENU, DELETE_MENU, GET_ALL_MENU, GET_SELECTED_MENU,
} from './types';
import toastr from '../utils/toastrInstance';

export const getAllMenu = () => dispatch => axios('/menu')
  .then(({ data }) => dispatch({ type: GET_ALL_MENU, payload: data.reverse() }))
  .catch(() => dispatch({ type: GET_ALL_MENU, payload: [] }));

export const getSelectedMenu = id => dispatch => axios(`/menu/${id}`)
  .then(({ data }) => {
    dispatch({ type: GET_SELECTED_MENU, payload: data });
  })
  .catch(() => {
    dispatch({ type: GET_SELECTED_MENU, payload: null });
  });


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
