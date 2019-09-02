import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../utils/axiosInstance';
import { GET_ALL_MENU, GET_ALL_MENU_FAILED, GET_ALL_MENU_SUCCESS } from '../actions/types';

export const getAllMenu = () => axios('/menu')
  .then(({ data }) => data)
  .catch(() => null);

function* fetchMenu() {
  try {
    const menu = yield call(getAllMenu);
    yield put({ type: GET_ALL_MENU_SUCCESS, payload: menu });
  } catch (error) {
    yield put({ type: GET_ALL_MENU_FAILED });
  }
}

export default function* watchGetMenu() {
  yield takeEvery(GET_ALL_MENU, fetchMenu);
}
