import { ADD_TO_CART, CART_ITEMS_COUNT } from './types';
import cartUtils from '../utils/cart';

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
