import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import TextFieldGroup from '../../components/common/TextFieldGroup.jsx';

function setup(error) {
  const props = {
    field: '',
    value: '',
    label: '',
    error,
    type: '',
    onChange: () => {},
    checkUserExists: () => {},
    materialIcon: '',
  };

  return shallow(<TextFieldGroup {...props} />);
}
describe('textFieldGroup', () => {
  it('renders div,input, label,span and i', () => {
    const wrapper = setup('false');
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });
  it('does not render form, img e.t.c', () => {
    const wrapper = setup('true');
    expect(wrapper.find('form').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('hr').length).toBe(0);
    expect(wrapper.find('li').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
  });
});
