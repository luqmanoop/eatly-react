import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './css/style.css';
import reducers from './reducers';
import AppRouter from './routes';

const store = createStore(reducers);

const appProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appProvider, document.getElementById('app'));
