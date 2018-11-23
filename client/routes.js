import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupPage from './components/signup/SignupPage.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import NotFound from './components/common/NotFound.jsx';
import VerifyToken from './utils/verifyToken';
import isloggedIn from './utils/isloggedIn';
import MyProfilePage from './components/users/MyProfilePage.jsx';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={isloggedIn(SignupPage, 'signup')} />
        <Route path="signup" component={isloggedIn(SignupPage, 'signup')}/>
        <Route path="login" component={isloggedIn(LoginPage, 'login')}/>
        <Route path="dashboard" component={VerifyToken(Dashboard)}/>
        <Route path="myprofile" component={VerifyToken(MyProfilePage)}/>
        <Route path="*" component={NotFound} status={404}/>
    </Route>
);
