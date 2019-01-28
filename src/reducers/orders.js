import { GET_USER_ORDERS, CANCEL_ORDER } from '../actions/types';

const initialState = { all: [] };

export default (state = initialState, action) => {
  const { type, payload = null } = action;
  switch (type) {
    case GET_USER_ORDERS:
      return { ...state, all: payload || [] };
    case CANCEL_ORDER:
      return { ...state, all: state.all.filter(order => order.id !== payload) };
    default:
      return state;
  }
};
