import Validator from 'validator';
import lodash from 'lodash';

/**
 * This function validates the user inputs
 *
 * @export
 * @param {object} data
 * @returns {string}
 */
export default function validateInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.query)) {
    errors.query = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: lodash.isEmpty(errors),
  };
}
