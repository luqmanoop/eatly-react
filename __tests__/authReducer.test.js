import authReducer from '../src/reducers/auth';
import * as types from '../src/actions/types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      isLoggedIn: null,
    });
  });

  it('successfully authentication', () => {
    expect(authReducer({}, { type: types.AUTHENTICATE, payload: { user: { id: 1 } } })).toEqual({
      user: { id: 1 },
      isLoggedIn: true,
    });
  });

  it('fails to authentication', () => {
    expect(authReducer({ user: null }, { type: types.AUTHENTICATE, payload: null })).toEqual({
      user: null,
      isLoggedIn: false,
    });
  });

  it('should return logout state', () => {
    expect(authReducer({}, { type: types.LOG_OUT })).toEqual({
      user: null,
      isLoggedIn: false,
    });
  });
});
