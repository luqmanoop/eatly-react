import { GET_ALL_MENU, GET_SELECTED_MENU } from '../actions/types';

const initialState = { all: [], selected: null };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MENU:
      return { ...state, all: payload };
    case GET_SELECTED_MENU:
      return { ...state, selected: payload };
    default:
      return { ...state };
  }
};
