import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {
  SET_CURRENT_USER,
} from '../actions/actionTypes';

/**
 * This function sets the current user to state
 *
 * @export
 * @param {object} user the currently logged in user
 * @returns {object}
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/**
 * This function logins in the user
 *
 * @export
 * @param {object} userData the dato of the prospective user
 * @returns {object}
 */
export function login(userData) {
  return dispatch => axios.post('/users/login', userData)
    .then((res) => {
      const token = res.data.token;
      window.localStorage.setItem('jwtToken_JedDoc', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
}

/**
 * This function logouts a user
 *
 * @export
 * @param {object} user the currently logged in user
 * @returns {object}
 */
export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('jwtToken_JedDoc');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
