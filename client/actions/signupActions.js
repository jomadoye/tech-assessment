import axios from 'axios';

export function userSignupRequest(userData) {
  return () => axios.post('users', userData);
}
export function isUserExists(query) {
  return () => axios.get(`users/validate/${query}`);
}
