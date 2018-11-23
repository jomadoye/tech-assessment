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
    this.state = {
      user: {
        username: this.props.user.username,
        fullname: this.props.user.fullname,
        password: this.props.user.password,
        email: this.props.user.email,
      },
      isUpdatingUser: true,
      showSubmitButton: false,
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.setupUpdateUser = this.setupUpdateUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    return this.setState({
      user,
    });
  }

  updateUserProfile(event) {
    event.preventDefault();
    const { id, roleId } = this.props.user;
    this.setState({ isUpdatingUser: true, showSubmitButton: false });
    this.props.updateUserProfile(this.state.user, id, roleId);
    this.props.deleteFlashMessage(1);
  }

  setupUpdateUser(event) {
    event.preventDefault();
    this.setState({ isUpdatingUser: false, showSubmitButton: true });
  }

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
      swal('Deleted!', 'This Account has been deleted.', 'success');
      this.props.logout();
      this.props.deleteUserAccount(this.props.user.id);
    });
  }

  render() {
    const { isUpdatingUser, showSubmitButton } = this.state;
    const disabled = isUpdatingUser;
    return (
      <div>
        <div className="container center-align">
          <h4>{this.props.user.fullname}, welcome to your profile page</h4>
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
                {!showSubmitButton ? (<button
                onClick={this.setupUpdateUser}
                className="btn waves-effect waves-light"
                name="action">Edit User
                  <i className="material-icons right">send</i>
                </button>) : (<button
                  className="btn waves-effect waves-light"
                  type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>)}
                  <button className="btn waves-effect waves-light delete-user-btn"
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
  deleteUserAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

myProfilePage.contextTypes = {
  router: PropTypes.object.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(loginAction.logout()),
    updateUserProfile: (user, userId, roleId) =>
      dispatch(userAction.updateUserProfile(user, userId, roleId)),
    deleteFlashMessage: message => dispatch(deleteFlashMessage(message)),
    deleteUserAccount: userId => dispatch(userAction.deleteUserAccount(userId)),
  };
}
export default connect(state => ({ user: state.login.user }), mapDispatchToProps)(myProfilePage);
