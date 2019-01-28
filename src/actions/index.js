import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';
import cartUtils from '../utils/cart';
import toastr from '../utils/toastrInstance';

import {
  GET_ALL_MENU,
  GET_SELECTED_MENU,
  AUTHENTICATE,
  LOG_OUT,
  ADD_TO_CART,
  CART_ITEMS_COUNT,
  PLACE_ORDER,
  GET_USER_ORDERS,
  CANCEL_ORDER,
} from './types';

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

export const getCurrentUser = () => dispatch => axios
  .get('/users/me')
  .then(({ data }) => dispatch({ type: AUTHENTICATE, payload: { user: data } }))
  .catch(() => dispatch({ type: AUTHENTICATE }));

export const signUp = formData => dispatch => axios
  .post('/auth/signup', formData)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: AUTHENTICATE, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: AUTHENTICATE, payload: { error } }));

export const login = credentials => dispatch => axios
  .post('/auth/login', credentials)
  .then(({ data: { user: { token, ...user } } }) => {
    authUtils.saveToken(token);
    dispatch({ type: AUTHENTICATE, payload: { user } });
    return getCurrentUser()(dispatch);
  })
  .catch(error => dispatch({ type: AUTHENTICATE, payload: { error } }));

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

export const placeOrder = data => dispatch => axios.post('/orders', data)
  .then(() => {
    dispatch({ type: PLACE_ORDER });
    return true;
  }).catch(() => false);

export const getUserOrders = userId => dispatch => axios.get(`/users/${userId}/orders`)
  .then(({ data }) => dispatch({ type: GET_USER_ORDERS, payload: data }))
  .catch(() => dispatch({ type: GET_USER_ORDERS }));

export const cancelOrder = id => async dispatch => axios.delete(`/orders/${id}/cancel`)
  .then(() => {
    dispatch({ type: CANCEL_ORDER, payload: id });
    toastr.success('Order cancelled successfully');
  }).catch(() => toastr.error('Failed to cancel order. Please try again later'));
