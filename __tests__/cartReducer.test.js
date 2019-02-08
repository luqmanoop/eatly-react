import cartReducer from '../src/reducers/cart';
import * as types from '../src/actions/types';

describe('cart reducer', () => {
  const initialState = { items: {}, count: 0 };
  const cartItems = [{
    id: 1,
    price: 299,
  },
  {
    id: 2,
    price: 499,
  }];
  it('return initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({
      items: {},
      count: 0,
    });
  });

  it('return state for adding item to cart', () => {
    expect(cartReducer(initialState, {
      type: types.ADD_TO_CART,
      payload: cartItems[0],
    })).toEqual({
      ...initialState,
      [cartItems[0].id]: cartItems[0],
    });
  });

  it('returns state for getting cart items count', () => {
    expect(cartReducer(initialState, {
      type: types.CART_ITEMS_COUNT,
      payload: 1,
    })).toEqual({
      ...initialState,
      count: 1,
    });
  });

  it('return state for getting all cart items', () => {
    expect(cartReducer(initialState, {
      type: types.GET_CART_ITEMS,
      payload: { ...cartItems },
    })).toEqual({
      ...initialState,
      items: { ...cartItems },
    });
  });
});
