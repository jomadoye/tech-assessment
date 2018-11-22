import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

/**
 * This function verifies the token being used on the  frontend
 *
 * @export
 * @param {ReactComponent} ComposedComponent
 * @returns {ReactComponent}
 */
export default function (ComposedComponent) {
  class VerifyToken extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page',
        });
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  VerifyToken.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  VerifyToken.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  /**
   * mapStateToProps
   *
   * @param {object} state
   * @returns {object} state
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.login.isAuthenticated,
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(VerifyToken);
}
