import axios from 'axios';
import {
  LOAD_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_SUCCESS,
  LOAD_ALL_USERS_SUCCESS,
} from '../actions/actionTypes';
import {
  addFlashMessage,
  deleteFlashMessage,
} from '../actions/flashMessages';

export function loadUserProfileSuccess(user) {
  return {
    type: LOAD_USER_PROFILE_SUCCESS,
    userDetails: user,
  };
}

export function updateUserProfileSuccess(user) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    updatedUser: user,
  };
}

export function deleteUserAccountSuccess() {
  return {
    type: DELETE_USER_PROFILE_SUCCESS,
  };
}

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

export function loadAllUsersSuccess(users, metadata, count) {
  return {
    type: LOAD_ALL_USERS_SUCCESS,
    users,
    metadata,
    count,
  };
}

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
