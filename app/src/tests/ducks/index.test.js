import configureStore from '../../ducks/index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Ducks Index', () => {

    it('should render as expected', function() {
      const tree = configureStore();
      expect(tree).toMatchSnapshot();
    });
  });