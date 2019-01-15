import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';
import cartUtils from '../utils/cart';
import {
  GET_ALL_MENU,
  SIGN_UP,
  LOG_IN,
  GET_CURRENT_USER,
  LOG_OUT,
  ADD_TO_CART,
  CART_ITEMS_COUNT,
} from './types';

export const getAllMenu = () => dispatch => axios('/menu')
  .then(({ data }) => dispatch({ type: GET_ALL_MENU, payload: data.reverse() }))
  .catch(() => dispatch({ type: GET_ALL_MENU, payload: [] }));

export const getCurrentUser = () => dispatch => axios
  .get('/users/me')
  .then(({ data }) => dispatch({ type: GET_CURRENT_USER, payload: data }))
  .catch(() => dispatch({ type: GET_CURRENT_USER }));

export const signUp = formData => dispatch => axios
  .post('/auth/signup', formData)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: SIGN_UP, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: SIGN_UP, payload: { error } }));

export const login = credentials => dispatch => axios
  .post('/auth/login', credentials)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: LOG_IN, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: LOG_IN, payload: { error } }));

export const logoutUser = () => {
  authUtils.removeToken();
  return { type: LOG_OUT };
};

export const getCartItemsCount = () => ({
  type: CART_ITEMS_COUNT,
  payload: cartUtils.getCartCount(),
});

export const addToCart = ({ description, ...menu }) => (dispatch) => {
  const cartItems = cartUtils.getCart();
  const newMenu = { ...menu };
  if (!cartItems) {
    newMenu.qty = 1;
    cartUtils.saveCart({ [newMenu.id]: newMenu });
  } else {
    if (cartUtils.getCartItem(newMenu.id)) {
      cartItems[newMenu.id].qty += 1;
    } else {
      newMenu.qty = 1;
      cartItems[newMenu.id] = newMenu;
    }
    cartUtils.saveCart(cartItems);
  }
  dispatch({ type: ADD_TO_CART, payload: cartUtils.getCartItem(newMenu.id) });
  dispatch(getCartItemsCount());
};
