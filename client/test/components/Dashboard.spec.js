import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import { Dashboard } from '../../components/Dashboard/Dashboard.jsx';

function setup() {
  const props = {
    contextTypes: () => ({}),
    state: {},
    onchange: () => ({}),
    onsubmit: () => ({}),
    allUsers: {
      users: [{
        id: 7,
        fullname: 'jerry',
        username: 'jerry',
        email: 'jerry@ff.com',
        roleId: 3,
        password: '$2a$08$mXt6ErO1NQVw4j/lkBsIseLxX7haeonkmgh9svP5XJQXC5oo02Z1a',
        createdAt: '2017-05-20T14:01:40.065Z',
        updatedAt: '2017-05-20T14:01:40.065Z',
      }],
    },
    deleteFlashMessage: () => ({}),
  };

  return shallow(< Dashboard {...props
    }
    />);
}
describe('Dashboard', () => {
  const wrapper = setup();
  it('renders a table (ReactTable)', () => {
    expect(wrapper.find('ReactTable')
          .length)
        .toBe(1);
  });

  it('should have h3 heading', () => {
    expect(wrapper.find('h3')
          .first()
          .props()
          .children)
        .toBe('List of registered users ');
  });
});
