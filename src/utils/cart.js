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

const updateItemQuantity = (item) => {
  const menu = { ...item };
  const exisitingMenu = getCartItem(menu.id);
  if (exisitingMenu) {
    menu.qty = exisitingMenu.qty + 1;
  } else {
    menu.qty = 1;
  }
  return { ...getCart(), [menu.id]: menu };
};

const clearCart = () => {
  localStorage.removeItem(cartKey);
};

export default {
  getCart,
  getCartCount,
  getCartItem,
  saveCart,
  updateItemQuantity,
  clearCart,
};
