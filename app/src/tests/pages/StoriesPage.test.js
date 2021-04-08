import StoriesPage from '../../pages/StoriesPage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Stories Page', () => {

    it('should render as expected', function() {
      const tree = StoriesPage;
      expect(tree).toMatchSnapshot();
    });
  });