import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error,
        type, onChange, checkUserExists, materialIcon }) => (
        <div className="row">
          <div className="input-field col s8 offset-m2">
            <i className="material-icons prefix">{materialIcon}</i>
            <input
              id={field}
              type={type}
              name={field}
              value={value}
              onChange={onChange}
              onBlur={checkUserExists}
              className=
              {classnames('validate', { invalid: error }, { valid: !error })} />
              {error &&
              <span className="red">
                {error}
              </span>
              }
            <label htmlFor={field}>{label}</label>
          </div>
        </div>
  );

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  materialIcon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
