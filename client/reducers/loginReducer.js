import lodash from 'lodash';
import {
  SET_CURRENT_USER,
  UPDATE_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_SUCCESS,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.isUser, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !lodash.isEmpty(action.user),
        user: action.user.data,
      };

    case LOAD_USER_PROFILE_SUCCESS:
      {
        return {
          ...state, user: action.userDetails,
        };
      }

    case UPDATE_USER_PROFILE_SUCCESS:
      {
        return { ...state, user: action.updatedUser.user };
      }
    default:
      return state;
  }
};

