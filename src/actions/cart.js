import { ADD_TO_CART, CART_ITEMS_COUNT, GET_CART_ITEMS } from './types';
import cartUtils from '../utils/cart';

export const getCartItemsCount = () => ({
  type: CART_ITEMS_COUNT,
  payload: cartUtils.getCartCount(),
});

export const addToCart = ({ description, ...menu }) => (dispatch) => {
  const newMenu = { ...menu };
  const cartItems = cartUtils.updateItemQuantity(newMenu);
  cartUtils.saveCart(cartItems);

  dispatch({ type: ADD_TO_CART, payload: cartUtils.getCartItem(newMenu.id) });
  dispatch(getCartItemsCount());
};

export const getCartItems = () => {
  const cartItems = cartUtils.getCart();
  return { type: GET_CART_ITEMS, payload: cartItems };
};
