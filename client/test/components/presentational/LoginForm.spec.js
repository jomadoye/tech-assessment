import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import LoginForm from '../../../components/login/LoginForm.jsx';

/**
 * This function setup the component
 *
 * @returns {object}
 */
function setup() {
  const props = {
    state: {
      errors: {
        form: [],
      },
    },
    onsubmit: () => ({}),
    onchange: () => ({}),
  };

  return shallow(<LoginForm {...props} />);
}
describe('LoginForm', () => {
  const wrapper = setup();

  it('renders login page message', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').props().children).toBe('Login Page');
  });

  it('renders two input fields for password and username/email', () => {
    expect(wrapper.find('TextFieldGroup').length).toBe(2);
  });

  it('renders a signIn button', () => {
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').props().children[0]).toBe('SignIn');
  });

  it('does not render img, footer, li, ui, h5 e.t.c', () => {
    expect(wrapper.find('footer').length).toBe(0);
    expect(wrapper.find('li').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
    expect(wrapper.find('h5').length).toBe(0);
    expect(wrapper.find('p').length).toBe(0);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('h3').length).toBe(0);
    expect(wrapper.find('h4').length).toBe(0);
    expect(wrapper.find('row').length).toBe(0);
  });
});
