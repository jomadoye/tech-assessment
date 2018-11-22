import axios from 'axios';

/**
 * Thie function setsa the token on the frontend
 *
 * @export
 * @param {JWT_token} token
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
