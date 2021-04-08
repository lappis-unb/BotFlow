import React from 'react';
import Snackbar from '../../components/Snackbar';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux'
import { createStore } from "redux";

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer
        .create( <Snackbar
            variant='test'
            message='test'
            onClose={() => jest.fn()}
        />) 
        .toJSON();
    expect(tree).toMatchSnapshot();
});