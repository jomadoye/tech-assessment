import expect from 'expect';
import reducers from '../../reducers/';

describe('User Reducers', () => {
  it('should handle SET_CURRENT_USER actions', () => {
    const expectedState = {
      flashMessages: [],
      login: {
        isAuthenticated: true,
        user: {
          id: 7,
          username: 'jerry',
          fullname: 'jerry',
          roleId: 3,
          email: 'jerry@ff.com',
        },
      },
      user: [],
    };
    const state = reducers({
      flashMessages: [],
      login: {
        isAuthenticated: false,
        user: {},
      },
      user: [],
    }, {
      type: 'SET_CURRENT_USER',
      user: {
        data: {
          id: 7,
          username: 'jerry',
          fullname: 'jerry',
          roleId: 3,
          email: 'jerry@ff.com',
        },
        iat: 1495288909,
        exp: 1495375309,
      },
    });

    // Assertion
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle LOAD_USER_PROFILE_SUCCESS actions', () => {
    const expectedState = {
      flashMessages: [],
      login: {
        isAuthenticated: true,
        user: {
          id: 7,
          fullname: 'jerry',
          username: 'jerry',
          email: 'jerry@ff.com',
          roleId: 3,
          password: '$2a$08$b.rXG69qFkdd3jGnLVrfUewpAC0zYx4vZifhMTKkwEJxG4n7lVAGO',
          createdAt: '2017-05-20T14:01:40.065Z',
          updatedAt: '2017-05-20T14:01:40.065Z',
        },
      },
      user: [],
    };
    const state = reducers({
      flashMessages: [],
      login: {
        isAuthenticated: true,
        user: {
          id: 7,
          username: 'jerry',
          fullname: 'jerry',
          roleId: 3,
          email: 'jerry@ff.com',
        },
      },
      user: [],
    }, {
      type: 'LOAD_USER_PROFILE_SUCCESS',
      userDetails: {
        id: 7,
        fullname: 'jerry',
        username: 'jerry',
        email: 'jerry@ff.com',
        roleId: 3,
        password: '$2a$08$b.rXG69qFkdd3jGnLVrfUewpAC0zYx4vZifhMTKkwEJxG4n7lVAGO',
        createdAt: '2017-05-20T14:01:40.065Z',
        updatedAt: '2017-05-20T14:01:40.065Z',
      },
    });

    // Assertion
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle UPDATE_USER_PROFILE_SUCCESS actions', () => {
    const expectedState = {
      flashMessages: [{
        id: 1,
        text: 'User updated successfully.',
      }],
      login: {
        isAuthenticated: true,
        user: {
          id: 7,
          fullname: 'jerry',
          username: 'jerry',
          email: 'jerry@ff.com',
          roleId: 3,
          password: '$2a$08$mXt6ErO1NQVw4j/lkBsIseLxX7haeonkmgh9svP5XJQXC5oo02Z1a',
          createdAt: '2017-05-20T14:01:40.065Z',
          updatedAt: '2017-05-20T14:01:40.065Z',
        },
      },
      user: [],
    };
    const state = reducers({
      flashMessages: [{
        id: 1,
        text: 'User updated successfully.',
      }],
      login: {
        isAuthenticated: true,
        user: {
          id: 7,
          fullname: 'jerry',
          username: 'jerry',
          email: 'jerry@ff.com',
          roleId: 3,
          password: '$2a$08$b.rXG69qFkdd3jGnLVrfUewpAC0zYx4vZifhMTKkwEJxG4n7lVAGO',
          createdAt: '2017-05-20T14:01:40.065Z',
          updatedAt: '2017-05-20T14:01:40.065Z',
        },
      },
      user: [],
    }, {
      type: 'UPDATE_USER_PROFILE_SUCCESS',
      updatedUser: {

        message: 'User updated successfully.',
        user: {
          id: 7,
          fullname: 'jerry',
          username: 'jerry',
          email: 'jerry@ff.com',
          roleId: 3,
          password: '$2a$08$mXt6ErO1NQVw4j/lkBsIseLxX7haeonkmgh9svP5XJQXC5oo02Z1a',
          createdAt: '2017-05-20T14:01:40.065Z',
          updatedAt: '2017-05-20T14:01:40.065Z',
        },
      },
    });

    // Assertion
    expect(state)
      .toEqual(expectedState);
  });
});
