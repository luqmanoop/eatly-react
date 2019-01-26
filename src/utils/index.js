import React from 'react';
import { render } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducers, initialState, applyMiddleware(thunk)) } = {},
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});

export const fakeNetworkDelay = (cb, timeout = 500) => {
  setTimeout(() => {
    cb();
  }, timeout);
}

export const formatPrice = price => parseFloat(price).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});