import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menuReducer from './menu';
import authReducer from './auth';

export default combineReducers({
  allMenu: menuReducer,
  auth: authReducer,
  form: formReducer,
});
