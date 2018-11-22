import React from 'react';
import PropTypes from 'prop-types';
import signupValidation
  from '../../../server/shared/validations/signup/signupValidation';
import TextFieldGroup from '../common/TextFieldGroup.jsx';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      fullname: '',
      password: '',
      errors: {},
      isLoading: false,
      invalid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      this.props.isUserExists(value)
        .then((res) => {
          const errors = this.state.errors;
          let invalid;
          if (res.data.user) {
            errors[field] = `There is a user with ${field}`;
            invalid = true;
          } else {
            errors[field] = '';
            invalid = false;
          }
          this.setState({ errors, invalid });
        });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isValid() {
    const { errors, isValid } = signupValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(() => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have signed up sucessfully, please SignIn',
          });
          this.context.router.push('login');
        })
        .catch((error) => {
          this.setState({ errors: error.response.data, isLoading: false });
        });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
      <form onSubmit={this.onSubmit} className="center-align">
        <TextFieldGroup
        materialIcon="account_circle"
        error={errors.fullname}
        label="fullname"
        onChange={this.onChange}
        value={this.state.fullname}
        field="fullname" />

        <TextFieldGroup
        materialIcon="account_box"
        error={errors.username}
        checkUserExists={this.checkUserExists}
        label="username"
        onChange={this.onChange}
        value={this.state.username}
        field="username" />

        <TextFieldGroup
        materialIcon="email"
        error={errors.email}
        checkUserExists={this.checkUserExists}
        label="email"
        type="email"
        onChange={this.onChange}
        value={this.state.email}
        field="email" />

        <TextFieldGroup
        materialIcon="https"
        error={errors.password}
        label="password"
        type="password"
        onChange={this.onChange}
        value={this.state.password}
        field="password"
        />

        <div className="container">
          <button
            type="submit"
            disabled={this.state.isLoading || this.state.invalid}
            className="btn waves-effect waves-light btn-large">
            Sign up
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SignupForm;
