import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup.jsx';

/**
 * This function renders the login page
 *
 * @export
 * @param {object} { state }
 * @param {function} { onsubmit }
 * @param {function} { onchange }
 * @returns {HTML}
 */
export default function LoginForm({ state, onsubmit, onchange }) {
  const { errors, query, password, isLoading } = state;
  return (
    <div>
    <h1 className="center-align welcome-message">Login Page</h1>
    <form onSubmit={onsubmit} className="center-align">
      {errors.form && <div className="teal darken-1">
      { errors.form } </div> }
      <TextFieldGroup
      materialIcon="account_circle"
      field="query"
      label="Username / Email"
      value={query}
      error={errors.query}
      onChange={onchange} />

      <TextFieldGroup
      materialIcon="https"
      type="password"
      field="password"
      label="Password"
      value={password}
      error={errors.password}
      onChange={onchange}
      />
      <div className="container">
        <button
          type="submit"
          className="btn waves-effect waves-light btn-large"
          disabled={isLoading}>
          SignIn
        <i className="material-icons right">send</i>
        </button>
      </div>
    </form>
    </div>
  );
}

LoginForm.propTypes = {
  state: PropTypes.object.isRequired,
  onsubmit: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
};

