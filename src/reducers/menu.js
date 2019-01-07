import { default as types } from '../actions/types';
const { GET_ALL_MENU } = types;

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MENU:
      return [...payload].reverse();
    default:
      return [...state].reverse();
  }
};
