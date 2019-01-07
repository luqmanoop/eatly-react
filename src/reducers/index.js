import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menuReducer from './menu';

export default combineReducers({
  allMenu: menuReducer,
  form: formReducer
});
