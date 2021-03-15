import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeConfig from './redux/store';
import { Provider } from 'react-redux';

const { store } = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

