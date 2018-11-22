import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateInput
 from '../../../server/shared/validations/login/loginValidation';
import { login } from '../../actions/loginActions';
import LoginForm from './LoginForm.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * This method validates the user input
   *
   * @returns
   *
   * @memberof LoginPage
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * This method handles the onSubmit handler
   *
   * @param {object} event
   *
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(() => {
        this.context.router.push('dashboard');
      }).catch((err) => {
        const response = err.response.data;
        this.setState({ errors: response, isLoading: false });
      });
    }
  }

  /**
   * This method handles the onChange handler
   *
   * @param {object} event
   *
   * @memberof LoginPage
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s8 offset-s2">
            <LoginForm
            state={this.state}
            onsubmit={this.onSubmit}
            onchange={this.onChange}/>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginPage);
