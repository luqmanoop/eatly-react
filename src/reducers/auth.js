import {
  AUTHENTICATE, LOG_OUT,
} from '../actions/types';

const initialState = { user: null, isLoggedIn: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATE:
      return payload.user
        ? { ...payload, isLoggedIn: true }
        : { ...state, ...payload, isLoggedIn: false };
    case LOG_OUT:
      return { user: null, isLoggedIn: false };
    default:
      return state;
  }
};
