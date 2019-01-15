const cartKey = 'cart';

const getCart = () => JSON.parse(window.localStorage.getItem(cartKey)) || {};

const getCartCount = () => {
  const cart = getCart();
  return Object.keys(cart)
    .map(key => cart[key].qty)
    .reduce((prev, curr) => prev + curr, 0);
};

const getCartItem = id => getCart()[id];

const saveCart = items => window.localStorage.setItem(cartKey, JSON.stringify(items));

export default {
  getCart,
  getCartCount,
  getCartItem,
  saveCart,
};
