import { GET_ALL_MENU } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MENU:
      return [...payload];
    default:
      return [...state];
  }
};
