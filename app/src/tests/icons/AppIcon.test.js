import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import AppIcon from '../../icons/AppIcon';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<AppIcon />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
