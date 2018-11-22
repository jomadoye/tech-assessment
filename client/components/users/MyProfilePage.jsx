import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import * as userAction from '../../actions/userAction';
import * as loginAction from '../../actions/loginActions';
import { deleteFlashMessage } from '../../actions/flashMessages';

class myProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadUserProfile(this.props.userId);
    this.state = {
      user: {
        username: this.props.user.username,
        fullname: this.props.user.fullname,
        password: '',
        email: this.props.user.email,
      },
      isUpdateingUser: true,
      showSubmitButton: false,
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.setupUpdateUser = this.setupUpdateUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * This method runs when the component props is updated
   *
   * @param {object} nextProps
   *
   * @memberof myProfilePage
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  /**
   * This method updates the user state
   *
   * @param {object} event
   * @returns
   *
   * @memberof myProfilePage
   */
  updateUserState(event) {
    const field = event.target.name;
    const user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    return this.setState({
      user,
    });
  }

  /**
   * This method updates a user profile
   *
   * @param {object} event
   *
   * @memberof myProfilePage
   */
  updateUserProfile(event) {
    event.preventDefault();
    this.setState({ isUpdateingUser: true, showSubmitButton: false });
    this.props.updateUserProfile(this.state.user, this.props.user.id,
    this.props.roleId);
    this.props.deleteFlashMessage(1);
  }

  /**
   * This method setups the user modal
   *
   * @param {object} event
   *
   * @memberof myProfilePage
   */
  setupUpdateUser(event) {
    event.preventDefault();
    this.setState({ isUpdateingUser: false, showSubmitButton: true });
  }

  /**
   * This method handles user delete
   *
   * @param {object} event
   *
   * @memberof myProfilePage
   */
  handleDelete(event) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this account!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
    },
    () => {
      this.props.deleteUserAccount(this.props.userId);
      this.props.logout();
      swal('Deleted!', 'This Account has been deleted.', 'success');
    });
  }
  render() {
    const { isUpdateingUser, showSubmitButton } = this.state;
    const disabled = isUpdateingUser;
    return (
      <div>
        <div className="container center-align">
          <h1>{this.props.user.fullname}, welcome to your profile page</h1>
          <hr />
          <div className="row">
            <form className="col s8 offset-s2"
              onSubmit={this.updateUserProfile}>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled}
                    onChange={this.updateUserState} name="fullname"
                    value={this.state.user.fullname} id="full_name"
                    type="text" className="validate"/>
                  <label className="active"
                    htmlFor="full_name">Full Name</label>
                </div>
                <div className="input-field">
                  <input disabled={disabled}
                    onChange={this.updateUserState}
                    name="username"
                    value={this.state.user.username}
                    id="username" type="text"
                    className="validate active"/>
                  <label className="active" htmlFor="username">UserName</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled}
                  onChange={this.updateUserState}
                  name="password" value={this.state.user.password}
                  id="password" type="password" className="validate"/>
                  <label className="active" htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled}
                  onChange={this.updateUserState}
                  name="email" value={this.state.user.email}
                  id="email" type="email" className="validate"/>
                  <label className="active" htmlFor="email">Email</label>
                </div>
              </div>
              <div>
                {!showSubmitButton && <button
                onClick={this.setupUpdateUser}
                id="editUserBtn"
                className="btn waves-effect waves-light"
                name="action">Edit User
                  <i className="material-icons right">send</i>
                </button>}
                  {showSubmitButton && <button
                  id="editUserSubmitBtn"
                  className="btn waves-effect waves-light"
                  type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>}
                  <button className="btn waves-effect waves-light"
                  id="deleteUserBtn"
                  onClick={this.handleDelete}
                  name="action">Delete User
                    <i className="material-icons right">delete_forever</i>
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

myProfilePage.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
  loadUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  roleId: PropTypes.number.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

myProfilePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns {object} state
 */
function mapStateToProps(state) {
  const hasUserDetailsProperty = Object.prototype.hasOwnProperty
    .call(state.user, 'userDetails');
  if (hasUserDetailsProperty) {
    return {
      userId: state.login.user.id,
      roleId: state.login.user.roleId,
      user: state.user.userDetails,
    };
  }
  return {
    userId: state.login.user.id,
    user: state.login.user,
    roleId: state.login.user.roleId,
  };
}

/**
 * mapDispatchToProps
 *
 * @param {function} dispatch
 * @returns dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUserProfile: userId => dispatch(userAction.loadUserProfile(userId)),
    logout: () => dispatch(loginAction.logout()),
    updateUserProfile: (user, userId, roleId) =>
      dispatch(userAction.updateUserProfile(user, userId, roleId)),
    deleteFlashMessage: a => dispatch(deleteFlashMessage(a)),
    deleteUserAccount: userId => dispatch(userAction.deleteUserAccount(userId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(myProfilePage);
