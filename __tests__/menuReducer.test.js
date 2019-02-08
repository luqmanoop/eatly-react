import menuReducer from '../src/reducers/menu';
import * as types from '../src/actions/types';

describe('menu reducer', () => {
  const initialState = {
    all: [],
    selected: null,
  };

  const payload = [{
    id: 1, name: 'jollof', price: 299, imgUrl: 'https://img.io',
  }];

  it('returns the initial state', () => {
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });

  it('return state for get all menu', () => {
    expect(menuReducer(initialState, {
      type: types.GET_ALL_MENU,
      payload,
    })).toEqual({
      selected: null,
      all: payload,
    });
  });

  it('return state for getting a selected menu', () => {
    expect(menuReducer(initialState, {
      type: types.GET_SELECTED_MENU,
      payload: payload[0],
    })).toEqual({
      all: [],
      selected: payload[0],
    });
  });

  it('return state for deleting a menu', () => {
    expect(menuReducer({ ...initialState, all: payload }, {
      type: types.DELETE_MENU,
      payload: 1,
    })).toEqual({
      selected: null,
      all: [],
    });
  });
});
