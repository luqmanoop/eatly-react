import orderReducer from '../src/reducers/orders';
import * as types from '../src/actions/types';

describe('order reducer', () => {
  const initialState = { all: [] };
  const orders = [{ id: 1 }, { id: 2 }];

  it('returns initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('return state for getting user orders', () => {
    expect(
      orderReducer(initialState, {
        type: types.GET_USER_ORDERS,
        payload: orders,
      }),
    ).toEqual({
      ...initialState,
      all: orders,
    });
  });

  it('return state for cancelling an order', () => {
    expect(
      orderReducer(
        { ...initialState, all: orders },
        {
          type: types.CANCEL_ORDER,
          payload: 1,
        },
      ),
    ).toEqual({
      ...initialState,
      all: [orders[1]],
    });
  });
});
