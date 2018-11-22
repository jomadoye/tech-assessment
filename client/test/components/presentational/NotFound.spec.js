import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import NotFound from '../../../components/common/NotFound.jsx';

/**
 * This function setup the component
 *
 * @returns {object}
 */
function setup() {
  const props = {
  };

  return shallow(<NotFound {...props} />);
}
describe('NotFound', () => {
  const wrapper = setup();

  it('it renders a status code', () => {
    expect(wrapper.find('h3').length).toBe(2);
    expect(wrapper.find('h3').first().props().children).toBe('404');
  });

  it('it renders a message', () => {
    expect(wrapper.find('h3').length).toBe(2);
    expect(wrapper.find('h3').last().props().children).toBe('page not found');
  });

  it('renders a more descriptive message', () => {
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('p').first().props().children)
      .toBe('We are sorry but the page you are looking for does not exist.');
  });

  it('renders a direction to the dashboard', () => {
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('p').last().props().children[0])
      .toBe('Please go back to the');
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').props().children).toBe('dashboard');
  });

  it('does not render footer, li, ul, h5, img, form, h1, h2, h4, row', () => {
    expect(wrapper.find('footer').length).toBe(0);
    expect(wrapper.find('li').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
    expect(wrapper.find('h5').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('form').length).toBe(0);
    expect(wrapper.find('h1').length).toBe(0);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('h4').length).toBe(0);
    expect(wrapper.find('row').length).toBe(0);
  });
});
