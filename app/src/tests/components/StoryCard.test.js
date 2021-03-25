import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Story } from '../../utils/DataFormat';
import StoryCard from '../../components/StoryCard';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const story_example = new Story(0, [{ type: 'intent', id: 1, name: 'intent_example' }, { type: 'utter', id: 2, name: 'utter_example' }], 'story_example1');
  const tree = renderer
    .create(<Router>
      <StoryCard
        story={story_example}
        highlighted_text=""
      />
            </Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
