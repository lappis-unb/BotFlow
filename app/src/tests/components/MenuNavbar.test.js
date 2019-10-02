
import React from 'react';
import MenuNavbar from '../../components/MenuNavbar';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';


Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {

    const tree = renderer
        .create(<Router><MenuNavbar /></Router>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});