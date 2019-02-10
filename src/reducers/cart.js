import { ADD_TO_CART, CART_ITEMS_COUNT, GET_CART_ITEMS } from '../actions/types';

const initialState = { items: {}, count: 0 };
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [payload.id]: payload };
    case CART_ITEMS_COUNT:
      return { ...state, count: payload };
    case GET_CART_ITEMS:
      return { ...state, items: payload };
    default:
      return state;
  }
};
