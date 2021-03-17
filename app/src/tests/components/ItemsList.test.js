import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import IntentIcon from '../../icons/IntentIcon';
import ItemsList from '../../components/ItemsList';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<ItemsList
      actionOnClick={() => jest.fn()}
      items={[{ name: '1' }, { name: '2' }]}
      icon={<IntentIcon />}
      highlighted_text=""
      selected_item_position={0}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
