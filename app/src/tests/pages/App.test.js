import App from '../../pages/App';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing App Page', () => {

    it('should render as expected', function() {
      const tree = App();
      expect(tree).toMatchSnapshot();
    });
  });