
import React from 'react';
import NameField from '../../components/NameField';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {

    const tree = renderer
        .create(<NameField 
            name='name example'
            items={['1', '2']}
            item_id={1}
            label='label example'
            placeholder='placeholder example'
            setItemName={jest.fn()}
            helper_text='helper text example'
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});