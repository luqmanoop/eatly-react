import types from '../actions/types';

const { SIGN_UP, GET_USER, LOG_OUT } = types;
const initialState = { user: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return payload.user ? payload : { ...state, error: payload };
    case GET_USER:
      return payload ? { user: payload } : state;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
