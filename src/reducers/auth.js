import {
  GET_CURRENT_USER, SIGN_UP, LOG_OUT, LOG_IN,
} from '../actions/types';

const initialState = { user: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return payload.user ? payload : { ...state, ...payload };
    case LOG_IN:
      return payload.user ? payload : { ...state, ...payload };
    case GET_CURRENT_USER:
      return payload ? { user: payload } : state;
    case LOG_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
