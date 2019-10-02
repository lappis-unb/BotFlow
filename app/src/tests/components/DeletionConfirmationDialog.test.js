import React from 'react';
import DeletionConfirmationDialog from '../../components/DeletionConfirmationDialog';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer
        .create(<DeletionConfirmationDialog
            handleClose={() => jest.fn()}
            deleteItem={() => jest.fn()}
            dialog_status={false}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});