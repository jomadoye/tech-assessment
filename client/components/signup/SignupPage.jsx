import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import * as SignupActions from '../../actions/signupActions';
import * as FlashMessageActions from '../../actions/flashMessages';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s8 offset-s2">
            <h1 className="center-align welcome-message">Sign Up Here</h1>
            <SignupForm userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage}
            isUserExists={isUserExists} />
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    userSignupRequest: userData =>
      dispatch(SignupActions.userSignupRequest(userData)),
    isUserExists: query =>
      dispatch(SignupActions.isUserExists(query)),
    addFlashMessage: message =>
      dispatch(FlashMessageActions.addFlashMessage(message)),
  };
}
export default connect(null, mapDispatchToProps)(SignupPage);
