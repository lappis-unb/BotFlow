import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import CustomSnackbar from '../../components/CustomSnackbar';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<CustomSnackbar
      variant="success"
      message="example text"
      onClose={() => jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
