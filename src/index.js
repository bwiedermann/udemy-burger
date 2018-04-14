import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import rootReducer from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const app = (
  <BrowserRouter>
    <Provider store={createStore(rootReducer)}>
      <App />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
