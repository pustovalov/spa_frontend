import React from 'react';
import Navbar from '../Navbar.jsx';
import createComponentWithIntl from '../../utils/createComponentWithIntl';
import renderer from 'react-test-renderer';
import mockStore from 'redux-mock-store'

test('Link changes the class when hovered', () => {
  const component = createComponentWithIntl(<Navbar/>);

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
