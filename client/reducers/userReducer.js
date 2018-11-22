import initialState from './initialState';
import {
  LOAD_ALL_USERS_SUCCESS,
} from '../actions/actionTypes';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case LOAD_ALL_USERS_SUCCESS:
      {
        const users = {
          count: action.count,
          page: action.metadata.page,
          pageCount: action.metadata.pageCount,
          pageSize: action.metadata.pageSize,
          totalCount: action.metadata.totalCount,
          users: action.users,
        };
        return Object.assign({}, state, {
          allUsers: users,
        });
      }

    default:
      {
        return state;
      }
  }
}
