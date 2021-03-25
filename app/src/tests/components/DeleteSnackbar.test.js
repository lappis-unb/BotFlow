import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import DeleteSnackbar from '../../components/DeleteSnackbar';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<DeleteSnackbar
      handleUndo={() => jest.fn()}
      handleSnackbarClick={() => jest.fn()}
      undo={false}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
