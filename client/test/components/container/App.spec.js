import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import App from '../../../components/App';
import Footer from '../../../components/common/footer.jsx';
import NavigationBar from '../../../components/common/NavigationBar.jsx';

describe(' Test for App Component', () => {
  it('renders the root component', () => {
    shallow(<App />);
  });
  it('renders NavigationBar', () => {
    const wrapper = shallow(<App />);
    const navbar = <NavigationBar />;
    expect(wrapper.contains(navbar)).toEqual(true);
  });
  it('renders the props children of navigationBar', () => {
    const wrapper = shallow(
      <App>
        <NavigationBar />
      </App>,
    );
    expect(wrapper.contains(<NavigationBar />)).toEqual(true);
  });
  it('renders the props children of Footer', () => {
    const wrapper = shallow(
      <App>
        <Footer />
      </App>,
    );
    expect(wrapper.contains(<NavigationBar />)).toEqual(true);
  });
});
