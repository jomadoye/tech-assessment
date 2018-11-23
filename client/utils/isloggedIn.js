import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent, route) {
  class isloggedIn extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push('/dashboard');
      } else {
        this.context.router.push(route);
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
        this.context.router.push('/dashboard');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  isloggedIn.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  isloggedIn.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.login.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(isloggedIn);
}
