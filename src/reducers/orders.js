import { GET_USER_ORDERS } from '../actions/types';

const initialState = { all: [] };

export default (state = initialState, action) => {
  const { type, payload = null } = action;
  switch (type) {
    case GET_USER_ORDERS:
      return { ...state, all: payload || [] };
    default:
      return state;
  }
};
