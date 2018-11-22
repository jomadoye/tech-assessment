import {
  expect,
} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../../actions/loginActions';
import {
  SET_CURRENT_USER,
} from '../../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  email: 'jed@gmail.com',
  firstName: 'jedidiah',
  lastName: 'Omadoye',
  password: 'password',
};
describe('Authentication actions', () => {
  describe('login', () => {
    it('should login a user', () => {
      const expectedActions = [{
        type: SET_CURRENT_USER,
        user: { email: 'jed@gmail.com',
          firstName: 'jedidiah',
          lastName: 'Omadoye',
          password: 'password' },
      }];
      const store = mockStore({
        user: {},
      });
      store.dispatch(userActions.setCurrentUser(user));
      expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
    });
  });
  describe('logout', () => {
    it('should login a user', () => {
      const expectedActions = [{
        type: SET_CURRENT_USER,
      }];
      const store = mockStore({
        user:
        { email: 'jed@gmail.com',
          firstName: 'jedidiah',
          lastName: 'Omadoye',
          password: 'password' },
      });
      store.dispatch(userActions.setCurrentUser(user));
      expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
    });
  });
  describe('signup', () => {
    it('should signup a user', () => {
      const expectedActions = [{
        type: SET_CURRENT_USER,
      },
        user: {
          email: 'jed@gmail.com',
          firstName: 'jedidiah',
          lastName: 'Omadoye',
          password: 'password'
        },
      ];
      const store = mockStore({
        user: {},
      });
      store.dispatch(userActions.setCurrentUser(user));
      expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
    });
  });
});
