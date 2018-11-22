import React from 'react';
import { render } from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'react-table/react-table.css';

import routes from './routes';
import './public/css/styles.scss';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';
import configureStore from './store/configureStore';

const store = configureStore();

if (localStorage.jwtToken_TechAssessment) {
  setAuthorizationToken(localStorage.jwtToken_TechAssessment);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken_TechAssessment)));
}
render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app'),
);
