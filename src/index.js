import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import './assets/sass/style.scss';
import 'toastr/toastr.scss';
import AppRouter from './components/route';

const appProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appProvider, document.getElementById('app'));
