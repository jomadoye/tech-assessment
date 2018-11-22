import axios from 'axios';

/**
 * This function signups a user
 *
 * @export
 * @param {object} userData
 * @returns dispatch
 */
export function userSignupRequest(userData) {
  return () => axios.post('users', userData);
}

/**
 * This checks if a user exists
 *
 * @export
 * @param {object} query
 * @returns dispatch
 */
export function isUserExists(query) {
  return () => axios.get(`users/validate/${query}`);
}
