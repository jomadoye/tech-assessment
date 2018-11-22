import lodash from 'lodash';
import {
  SET_CURRENT_USER,
  UPDATE_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_SUCCESS,
  DELETE_SINGLE_USER_SUCCESS,
  SEARCH_USER_BY_USERNAME_SUCCESS,
  UPDATE_SINGLE_USER_BY_ADMIN_SUCCESS,
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
        return Object.assign({}, state, {
          user: action.userDetails,
        });
      }

    case UPDATE_USER_PROFILE_SUCCESS:
      {
        return Object.assign({}, state, {
          user: action.updatedUser.user,
        });
      }

    case SEARCH_USER_BY_USERNAME_SUCCESS:
      {
        return Object.assign({}, state, {
          allUsers: Object.assign({}, state.allUsers, action.users),
        });
      }

    // case UPDATE_USER_PROFILE_BY_ADMIN_SUCCESS:
    //   {
    //     const allusers = state.allUsers.users.filter(user =>
    //       user.id !== action.userId);
    //     const users = {
    //       count: state.allUsers.count,
    //       page: state.allUsers.page,
    //       pageCount: state.allUsers.pageCount,
    //       pageSize: state.allUsers.pageSize,
    //       totalCount: state.allUsers.totalCount,
    //       users: allusers,
    //     };
    //     return Object.assign({}, state, { allUsers: [
    //       ...users,
    //       Object.assign({}, action.updatedUser),
    //     ],
    //     });
    //   }

    case UPDATE_SINGLE_USER_BY_ADMIN_SUCCESS:
      {
        const allusers = state.allUsers.users.filter(user =>
          user.id !== action.userId);
        allusers.push(action.updatedUser);
        const users = {
          count: state.allUsers.count,
          page: state.allUsers.page,
          pageCount: state.allUsers.pageCount,
          pageSize: state.allUsers.pageSize,
          totalCount: state.allUsers.totalCount,
          users: allusers,
        };
        return Object.assign({}, state, {
          allUsers: Object.assign({}, state.allUsers, users),
        });
      }

    case DELETE_SINGLE_USER_SUCCESS:
      {
        const allusers = state.allUsers.users.filter(user =>
          user.id !== action.userId);
        const users = {
          count: state.allUsers.count,
          page: state.allUsers.page,
          pageCount: state.allUsers.pageCount,
          pageSize: state.allUsers.pageSize,
          totalCount: state.allUsers.totalCount,
          users: allusers,
        };
        return Object.assign({}, state, {
          allUsers: users,
        });
      }

    case DELETE_USER_PROFILE_SUCCESS:
      {
        return state;
      }

    default:
      return state;
  }
};

