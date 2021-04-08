import UtterPage from '../../pages/UtterPage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Utter Page', () => {

    it('should render as expected', function() {
      const tree = UtterPage;
      expect(tree).toMatchSnapshot();
    });
  });