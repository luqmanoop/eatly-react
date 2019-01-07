import React from 'react';
import { render } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import reducers from '../../src/reducers';

export const renderWithRedux = (
  ui,
  { store = createStore(reducers, applyMiddleware(thunk)) } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store
});

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history
});
