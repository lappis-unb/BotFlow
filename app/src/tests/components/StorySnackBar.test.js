import MessageSnackbar from '../../components/StorySnackbar';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing StorySnackBar', () => {

    it('should render as expected', function() {
      const tree = MessageSnackbar({notification_text: 'test'}, {handleClose: () => jest.fn()}, {variant: "success" });
      expect(tree).toMatchSnapshot();
    });
  });