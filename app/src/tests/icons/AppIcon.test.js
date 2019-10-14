import React from 'react';
import AppIcon from '../../icons/AppIcon';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {

    const tree = renderer
        .create(<AppIcon/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});