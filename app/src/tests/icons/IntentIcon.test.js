import React from 'react';
import IntentIcon from '../../icons/IntentIcon';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {

    const tree = renderer
        .create(<IntentIcon />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});