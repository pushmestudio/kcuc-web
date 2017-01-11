import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import kcStore from './store/kcStore';

/**
 * エントリーポイント, Appを呼び出す
 * @module index
 * @see App
 * @see module:store/kcStore
 */

// bootstrapはes6 importには対応していないのでrequireする
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

const store = kcStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
