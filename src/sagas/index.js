import { all } from 'redux-saga/effects';
import menuSaga from './menu';

export default function* () {
  yield all([menuSaga()]);
}
