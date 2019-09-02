import { DELETE_MENU, GET_ALL_MENU_SUCCESS, GET_SELECTED_MENU } from '../actions/types';

const initialState = { all: [], selected: null };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MENU_SUCCESS:
      return { ...state, all: payload };
    case GET_SELECTED_MENU:
      return { ...state, selected: payload };
    case DELETE_MENU:
      return { ...state, all: state.all.filter(menu => menu.id !== payload) };
    default:
      return { ...state };
  }
};
