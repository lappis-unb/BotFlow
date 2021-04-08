import IntentPage from '../../pages/IntentPage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Intent Page', () => {

    it('should render as expected', function() {
      const tree = IntentPage;
      expect(tree).toMatchSnapshot();
    });
  });