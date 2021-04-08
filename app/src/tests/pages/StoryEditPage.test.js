import StoryEditPage from '../../pages/StoryEditPage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Story Edit Page', () => {

    it('should render as expected', function() {
      const tree = StoryEditPage;
      expect(tree).toMatchSnapshot();
    });
  });