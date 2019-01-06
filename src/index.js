import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './assets/sass/style.scss';
import reducers from './reducers';
import AppRouter from './routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const appProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appProvider, document.getElementById('app'));
