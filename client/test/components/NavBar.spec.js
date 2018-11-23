import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import {
  NavigationBar,
} from '../../components/common/NavigationBar.jsx';

function setup() {
  const props = {
    login: {
      isAuthenticated: true,
      user: {
        username: '',
      },
    },
  };

  return shallow(< NavigationBar {...props} />);
}
describe('NavigationBar', () => {
  const wrapper = setup();

  it('renders the name of the application', () => {
    expect(wrapper.find('.brand-logo')
          .props()
          .children[1])
        .toBe('Tech Assesment');
  });
  it('should have <div /> elements', () => {
    expect(wrapper.find('div')
          .length)
        .toBe(3);
  });

  it('should have an <Link /> element', () => {
    expect(wrapper.find('Link')
          .length)
        .toBe(2);
  });

  it('should have a <nav /> element', () => {
    expect(wrapper.find('nav')
          .length)
        .toBe(1);
  });

  it('should render the <a /> elements', () => {
    expect(wrapper.find('a')
          .length)
        .toBe(2);
  });

  it('should have an <ul /> element', () => {
    expect(wrapper.find('ul')
          .length)
        .toBe(3);
  });

  it('should have an <i /> element', () => {
    expect(wrapper.find('i')
          .length)
        .toBe(5);
  });

  it('should not have an <img /> element', () => {
    expect(wrapper.find('img')
          .length)
        .toBe(0);
  });

  it('does not render img, form, h1 -h4', () => {
    expect(wrapper.find('img')
          .length)
        .toBe(0);
    expect(wrapper.find('form')
          .length)
        .toBe(0);
    expect(wrapper.find('h1')
          .length)
        .toBe(0);
    expect(wrapper.find('h2')
          .length)
        .toBe(0);
    expect(wrapper.find('h3')
          .length)
        .toBe(0);
    expect(wrapper.find('h4')
          .length)
        .toBe(0);
    expect(wrapper.find('row')
          .length)
        .toBe(0);
  });
});
