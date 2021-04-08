import React from 'react';
import StoryList from '../../components/StoryList';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux'
import { createStore } from "redux";
import storyReducer from '../../ducks/stories'


Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const store = createStore(storyReducer);
    const tree = renderer
        .create( <Provider store={store}><StoryList
          onDragEnd = {() => jest.fn()}
          undo_delete = {false}
          handleSnackbarClick = {() => jest.fn()}
        />) 
    expect(tree).toMatchSnapshot();
    .toJSON(); </Provider>
)});