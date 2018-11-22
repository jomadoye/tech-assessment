import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';

export class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * This method handles logout
   *
   * @param {object} event
   *
   * @memberof NavigationBar
   */
  logout(event) {
    event.preventDefault();
    this.context.router.push('/');
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.login;
    const userLinks = (
      <div>
        <ul id="dropdown1" className="dropdown-content nav-dropdown">
          <li>
            <Link to="myprofile">
              Profile
              <i className="material-icons right">account_circle</i>
            </Link>
          </li>
          <li className="divider" />
          <li>
            <a id="logoutDropDownBtn" onClick={this.logout}>
              Logout
              <i className="material-icons right">power_settings_new</i>
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <div className="nav-wrapper">
              <form />
            </div>
          </li>
          <li>
            <Link to="dashboard">
              Dashboard
              <i className="material-icons right">view_module</i>
            </Link>
          </li>
          <li>
            <a className="dropdown-button" href="#!" data-activates="dropdown1">
              {user && `Welcome, ${user.username}`}
              <i className="material-icons right">
                arrow_drop_down
              </i>
            </a>
          </li>
        </ul>
       </div>
    );
    const guestLinks = (
      <ul className="nav navbar-right">
        <li id="signup">
           <Link to="/signup">
            Sign up
            <i className="material-icons right">exit_to_app</i>
           </Link>
        </li>
         <li id="login">
           <Link to="/login">
             login
             <i className="material-icons right">trending_flat</i>
           </Link>
         </li>
       </ul>
    );

    return (
      <div>
      <nav>
        <div className="nav-wrapper teal darken-4">
          <span className="brand-logo">
            <i
            id = "mobile-nav"
            className="material-icons button-collapse"
            data-activates="slide-out">menu</i>
            Tech Assesment
          </span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            { isAuthenticated ? userLinks : guestLinks }
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  login: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

NavigationBar.contextTypes = {
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
    login: state.login,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
