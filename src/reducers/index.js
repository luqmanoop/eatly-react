import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menuReducer from './menu';
import authReducer from './auth';
import cartReducer from './cart';

export default combineReducers({
  form: formReducer,
  allMenu: menuReducer,
  auth: authReducer,
  cart: cartReducer,
});
