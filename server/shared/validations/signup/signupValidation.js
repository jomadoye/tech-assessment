import Validator from 'validator';
import lodash from 'lodash';

/**
 * This function validates the user signup input
 *
 * @export
 * @param {object} data the user input
 * @returns {string}
 */
export default function validateInput(data) {
  const hasPropertyFullname = Object.prototype.hasOwnProperty
    .call(data, 'fullname');
  const hasPropertyUsername = Object.prototype.hasOwnProperty
    .call(data, 'username');
  const hasPropertyPassword = Object.prototype.hasOwnProperty
    .call(data, 'password');
  const hasPropertyEmail = Object.prototype.hasOwnProperty
    .call(data, 'email');
  const errors = {};
  if (hasPropertyFullname) {
    if (Validator.isEmpty(data.fullname)) {
      errors.fullname = 'Fullname is required';
    }
  }
  if (hasPropertyUsername) {
    if (Validator.isEmpty(data.username)) {
      errors.username = 'Username is required';
    }
  }
  if (hasPropertyPassword) {
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }
  }
  if (hasPropertyEmail) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'This Email is invalid';
    }
  }
  return {
    errors,
    isValid: lodash.isEmpty(errors),
  };
}
