import axios from '../utils/axiosInstance';
import toastr from '../utils/toastrInstance';
import { PLACE_ORDER, GET_USER_ORDERS, CANCEL_ORDER } from './types';
import { clearCart } from './cart';

export const placeOrder = data => dispatch => axios.post('/orders', data)
  .then(() => {
    dispatch({ type: PLACE_ORDER });
    return true;
  }).catch(() => false);

export const placeOrders = orders => async (dispatch) => {
  try {
    await Promise.all(orders.map(order => axios.post('/orders', order)));
    dispatch({ type: PLACE_ORDER });
    dispatch(clearCart());
    toastr.success('Order confirmed.');
    return true;
  } catch (error) {
    toastr.error('Failed to place your order. Please try again later.');
    return false;
  }
};

export const getUserOrders = userId => dispatch => axios.get(`/users/${userId}/orders`)
  .then(({ data }) => dispatch({ type: GET_USER_ORDERS, payload: data }))
  .catch(() => dispatch({ type: GET_USER_ORDERS }));

export const cancelOrder = id => async dispatch => axios.delete(`/orders/${id}/cancel`)
  .then(() => {
    dispatch({ type: CANCEL_ORDER, payload: id });
    toastr.success('Order cancelled successfully');
  }).catch(() => toastr.error('Failed to cancel order. Please try again later'));
