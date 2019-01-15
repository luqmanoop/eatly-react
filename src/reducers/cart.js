import { ADD_TO_CART, CART_ITEMS_COUNT } from '../actions/types';

const initialState = { count: 0 };
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [payload.id]: payload };
    case CART_ITEMS_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
};
