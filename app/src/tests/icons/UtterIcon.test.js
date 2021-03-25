import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import UtterIcon from '../../icons/UtterIcon';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<UtterIcon />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
