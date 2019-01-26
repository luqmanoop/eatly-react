import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menuReducer from './menu';
import authReducer from './auth';
import cartReducer from './cart';
import ordersReducer from './orders';

export default combineReducers({
  form: formReducer,
  menu: menuReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
});
