import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../../actions/userAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('loadUserProfile', () => {
    it("fetches a user's profile and dispatches loadUserProfile", () => {
      moxios.stubRequest('api/users/3', {
        status: 200,
        response: { username: 'jed', fullname: 'jed', roleId: 3 },
      });
      const expectedActions = [
        { type: 'LOAD_USER_PROFILE_SUCCESS', userDetails: { username: 'jed', fullname: 'jed', roleId: 3 } },
      ];
      const store = mockStore();
      store.dispatch(userActions.loadUserProfile(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('loadAllUsers', () => {
    it('retrieves users and dispatches loadAllUsersSuccess', () => {
      moxios.stubRequest('/users?limit=9&offset=0', {
        status: 200,
        response: {
          rows: [{ username: 'jed' }],
          metaData: {},
        },
      });
      const expectedActions = [
        { type: 'LOAD_ALL_USERS_SUCCESS', users: [{ username: 'tony' }], metaData: {}, offset: 0 },
      ];
      const store = mockStore();
      store.dispatch(userActions.loadAllUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('SaveUser', () => {
    it("updates a user's dispatching updateUserProfileSuccess", () => {
      moxios.stubRequest('/users/3', {
        status: 200,
        response: { username: 'jed' },
      });
      const expectedActions = [
        { type: 'UPDATE_USER_PROFILE_SUCCESS', user: { username: 'jed' } },
      ];
      const store = mockStore({});
      store.dispatch(userActions.updateUserProfile(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('deleteUserAccount', () => {
    it("deletes a user's profile and dispatches deleteUserAccountSuccess", () => {
      moxios.stubRequest('/users/3', {
        status: 200,
      });
      const expectedActions = [
        { type: 'DELETE_USER_PROFILE_SUCCESS' },
      ];
      const store = mockStore();
      store.dispatch(userActions.deleteUserAccount(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
