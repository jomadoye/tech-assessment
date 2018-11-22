import axios from 'axios';
import {
  LOAD_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_SUCCESS,
  LOAD_ALL_USERS_SUCCESS,
  DELETE_SINGLE_USER_SUCCESS,
  UPDATE_USER_PROFILE_BY_ADMIN_SUCCESS,
  SEARCH_USER_BY_USERNAME_SUCCESS,
  UPDATE_SINGLE_USER_BY_ADMIN_SUCCESS,
} from '../actions/actionTypes';
import {
  addFlashMessage,
  deleteFlashMessage,
} from '../actions/flashMessages';

/**
 * This function ensures a user profile was loaded successfully
 *
 * @export
 * @param {object} user the user
 * @returns {object}
 */
export function loadUserProfileSuccess(user) {
  return {
    type: LOAD_USER_PROFILE_SUCCESS,
    userDetails: user,
  };
}

/**
 * This function ensures a user profile was updated successfully
 *
 * @export
 * @param {object} user the user to update
 * @returns {object}
 */
export function updateUserProfileSuccess(user) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    updatedUser: user,
  };
}

/**
 * This function ensure the admin updated a user sucessfully
 *
 * @export
 * @param {object} user
 * @param {number} userId
 * @returns dispatch
 */
export function updateUserProfileByAdminSuccess(user, userId) {
  return {
    type: UPDATE_USER_PROFILE_BY_ADMIN_SUCCESS,
    updatedUser: user,
    userId,
  };
}

/**
 * This function deletes a user account
 *
 * @export
 * @returns {object}
 */
export function deleteUserAccountSuccess() {
  return {
    type: DELETE_USER_PROFILE_SUCCESS,
  };
}

/**
 * This function ensures the user was searched successfully
 *
 * @export
 * @param {string} users
 * @returns dispatch
 */
export function searchUserByUsernameSuccess(users) {
  return {
    type: SEARCH_USER_BY_USERNAME_SUCCESS,
    users,
  };
}

/**
 * This function loads user profile
 *
 * @export
 * @param {object} userId the user ID
 * @returns dispatch
 */
export function loadUserProfile(userId) {
  return dispatch => axios.get(`/api/users/${userId}`)
      .then((user) => {
        const userDetails = user.data;
        dispatch(loadUserProfileSuccess(userDetails));
      })
      .catch(() => {
        const message = {};
        message.text = 'Error searching user';
        dispatch(addFlashMessage(message));
      });
}

/**
 * This function updates the user profile
 *
 * @export
 * @param {object} user the user to update
 * @param {number} userId the user to update, Id
 * @param {number} roleId the user to update, roleId
 * @returns dispatch
 */
export function updateUserProfile(user, userId) {
  return dispatch => axios.put(`/api/users/${userId}`, user)
      .then((updatedUserDetails) => {
        const updatedUser = updatedUserDetails.data;
        const response = updatedUser.message;
        const message = {};
        message.text = response;
        dispatch(addFlashMessage(message));
        dispatch(updateUserProfileSuccess(updatedUser));
        dispatch(deleteFlashMessage(1));
      })
      .catch((error) => {
        const response = error.response.data.message;
        const message = {};
        message.text = response;
        dispatch(addFlashMessage(message));
      });
}

/**
 * This function deletes a user
 *
 * @export
 * @param {number} userId
 * @returns dispatch
 */
export function deleteUserAccount(userId) {
  return dispatch => axios.delete(`/api/users/${userId}`)
      .then(() => {
        dispatch(deleteUserAccountSuccess());
      })
      .catch(() => {
        const message = {};
        message.text = 'Error deleting user';
        dispatch(addFlashMessage(message));
      });
}

/**
 * This function ensures users are loaded sucessfully
 *
 * @export
 * @param {users} users
 * @param {metadata} metadata
 * @param {count} count
 * @returns {object}
 */
export function loadAllUsersSuccess(users, metadata, count) {
  return {
    type: LOAD_ALL_USERS_SUCCESS,
    users,
    metadata,
    count,
  };
}

/**
 * The function loads all users
 *
 * @export
 * @param {number} limit
 * @param {number} offset
 * @returns dispatch
 */
export function loadAllUsers(limit, offset) {
  if (limit || offset) {
    return dispatch => axios.get(`/api/users?limit=${limit}&offset=${offset}`)
      .then((res) => {
        const users = res.data.rows;
        const metadata = res.data.metaData;
        const count = res.data.count;
        dispatch(loadAllUsersSuccess(users, metadata, count));
      })
      .catch(() => {
        const message = {};
        message.text = 'Error searching user';
        dispatch(addFlashMessage(message));
      });
  }
  return dispatch => axios.get('/api/users')
        .then((res) => {
          const users = res.data.rows;
          const metadata = res.data.metaData;
          const count = res.data.count;
          dispatch(loadAllUsersSuccess(users, metadata, count));
        })
        .catch(() => {
          const message = {};
          message.text = 'Error loading user';
          dispatch(addFlashMessage(message));
        });
}

/**
 * This function ensure to delete a user sucessfully
 *
 * @export
 * @param {number} userId
 * @returns {object}
 */
export function deleteSingleUserAccountSuccess(userId) {
  return {
    type: DELETE_SINGLE_USER_SUCCESS,
    userId,
  };
}

/**
 * This function ensure the admin can edit a user account successfully
 *
 * @export
 * @param {object} updatedUser
 * @param {number} userId
 * @returns dispatch
 */
export function updateSingleUserAccountByAdminSuccess(updatedUser, userId) {
  return {
    type: UPDATE_SINGLE_USER_BY_ADMIN_SUCCESS,
    userId,
    updatedUser,
  };
}

/**
 * This function deletes a user
 *
 * @export
 * @param {number} userId
 * @returns dispatch
 */
export function deleteSingleUserAccount(userId) {
  return dispatch => axios.delete(`/api/users/${userId}`)
      .then((res) => {
        const message = {};
        message.text = res.data.message;
        dispatch(addFlashMessage(message));
        dispatch(deleteFlashMessage(1));
        dispatch(deleteSingleUserAccountSuccess(userId));
      });
}

/**
 * This function allows the admin edit a user profile
 *
 * @export
 * @param {object} updatedUser
 * @param {user} userId
 * @returns dispatch
 */
export function updateSingleUserAccountByAdmin(updatedUser, userId) {
  return dispatch => axios.put(`/api/users/${userId}`, updatedUser)
      .then((res) => {
        const message = {};
        message.text = res.data.message;
        dispatch(addFlashMessage(message));
        dispatch(deleteFlashMessage(1));
        dispatch(updateSingleUserAccountByAdminSuccess(updatedUser, userId));
      })
      .catch(() => {
        const message = {};
        message.text = 'Error updating user';
        dispatch(addFlashMessage(message));
      });
}

/**
 * throw error;
 *
 * @export
 * @param {string} searchQuery
 * @param {number} limit
 * @param {number} offset
 * @returns dispatch
 */
export function searchUserByUsername(searchQuery, limit, offset) {
  return dispatch =>
    axios.get(`/api/search/users?q=${searchQuery}
    &limit=${limit}&offset=${offset}`)
      .then((res) => {
        const users = res.data.users;
        dispatch(searchUserByUsernameSuccess(users));
      })
      .catch(() => {
        const message = {};
        message.text = 'Error searching user';
        dispatch(addFlashMessage(message));
      });
}
