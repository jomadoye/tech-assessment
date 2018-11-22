import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import Footer from '../../../components/common/footer.jsx';

/**
 * This function setup the component
 *
 * @returns {object}
 */
function setup() {
  const props = {};

  return shallow(< Footer {...props
    }
    />);
}
describe('Footer', () => {
  const wrapper = setup();

  it('renders two h5', () => {
    expect(wrapper.find('h5')
          .first()
          .props()
          .children)
        .toBe('Tech Assesment');
    expect(wrapper.find('h5')
          .last()
          .props()
          .children)
        .toBe('Informations');
  });

  it('renders four li', () => {
    expect(wrapper.find('li')
          .first()
          .props()
          .children.props.children)
        .toBe('Github');
    expect(wrapper.find('li')
          .last()
          .props()
          .children.props.children)
        .toBe('Author');
    expect(wrapper.find('ul')
          .first()
          .props()
          .children[0].props.children.props.children)
        .toBe('Github');
    expect(wrapper.find('ul')
          .first()
          .props()
          .children[1].props.children.props.children)
        .toBe('Submit Issues');
    expect(wrapper.find('ul')
          .first()
          .props()
          .children[2].props.children.props.children)
        .toBe('Contributing');
    expect(wrapper.find('ul')
          .first()
          .props()
          .children[3].props.children.props.children)
        .toBe('Author');
  });

  it('renders a ul', () => {
    expect(wrapper.find('ul')
          .length)
        .toBe(1);
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
