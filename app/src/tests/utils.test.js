import {
    isButtonEnabled,
    setHighlight,
    clone
} from '../utils/utils';

describe('is button enabled method', () => {
    it('should return button state', () => {
        let content = 'test content';
        let old_content = 'test old content';
        let name = 'test name';
        let old_name = 'test old name';
        let helper_text = '';
        let no_empty_fields = true;

        expect(isButtonEnabled(content, old_content, name, old_name, helper_text, no_empty_fields));
    })
})

describe('set highlight method', () => {
    it('should return highlight', () => {
        let name = 'test name';
        let text = 'text example';
        let result = ['test', 'name'];        
        expect(setHighlight(name, text)).toEqual(result);

    })
})

describe('set clone method', () => {
    it('should return a clone of the object', () => {
        let test_obj = {
            name: 'test obj',
            content: 'to test'
        };
        let clone_obj_test = clone(test_obj);
        test_obj.name = 'other name'
        let result = {
            name: 'test obj',
            content: 'to test'
        };
        expect(clone_obj_test).toEqual(result);

    })
})