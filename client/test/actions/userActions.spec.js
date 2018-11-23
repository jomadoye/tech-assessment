import {
  expect,
} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userAction from '../../actions/userAction';
import {
  LOAD_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_SUCCESS,
  LOAD_ALL_USERS_SUCCESS,
} from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  const user = {
    fullname: 'omadoye jedidiah',
    username: 'omadoye jedidiah',
    email: 'omadoye jedidiah',
    roleId: '3',
  };

  it('should loads a user profile',
    () => {
      const expectedActions = [{
        type: LOAD_USER_PROFILE_SUCCESS,
        userDetails: {
          email: 'omadoye jedidiah',
          fullname: 'omadoye jedidiah',
          roleId: '3',
          username: 'omadoye jedidiah',
        },
      }];
      const store = mockStore({
        login: {
          allUsers: {},
        },
      });
      store.dispatch(userAction.loadUserProfileSuccess(user));
      expect(store.getActions()[0])
        .to.eql(expectedActions[0]);
    });

  it('should updates a user profile',
    () => {
      const expectedActions = [{
        type: UPDATE_USER_PROFILE_SUCCESS,
        updatedUser: {
          fullanme: 'jed',
        },
      }];
      const store = mockStore({
        login: {
          allUsers: {},
        },
      });
      store.dispatch(userAction.updateUserProfileSuccess({
        fullanme: 'jed',
      }));
      expect(store.getActions()[0])
        .to.eql(expectedActions[0]);
    });

  it('should deletes a user',
    () => {
      const expectedActions = [{
        type: DELETE_USER_PROFILE_SUCCESS,
      }];
      const store = mockStore({
        login: {
          allUsers: {},
        },
      });
      store.dispatch(userAction.deleteUserAccountSuccess(1));
      expect(store.getActions()[0])
        .to.eql(expectedActions[0]);
    });

  it('should load all users',
    () => {
      const expectedActions = [{
        type: LOAD_ALL_USERS_SUCCESS,
        users: [
          {
            fullname: 'omas jed',
            username: 'jed',
          },
          {
            fullname: 'omas jed',
            username: 'jed1',
          },
        ],
        count: undefined,
        metadata: undefined,
      }];
      const store = mockStore({
        login: {
          allUsers: {},
        },
      });
      store.dispatch(userAction
        .loadAllUsersSuccess([{
          username: 'jed',
          fullname: 'omas jed',
        }, {
          username: 'jed1',
          fullname: 'omas jed',
        }]));
      expect(store.getActions()[0])
        .to.eql(expectedActions[0]);
    });
});
