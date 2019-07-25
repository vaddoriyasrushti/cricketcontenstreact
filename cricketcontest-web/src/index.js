import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/now-ui-dashboard.css";
import "assets/css/demo.css";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

