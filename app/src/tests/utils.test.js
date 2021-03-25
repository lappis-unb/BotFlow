import {
  isButtonEnabled,
  setHighlight,
  clone,
} from '../utils/utils';

describe('is button enabled method', () => {
  it('should return button state', () => {
    const content = 'test content';
    const old_content = 'test old content';
    const name = 'test name';
    const old_name = 'test old name';
    const helper_text = '';
    const no_empty_fields = true;

    expect(isButtonEnabled(content, old_content, name, old_name, helper_text, no_empty_fields));
  });
});

describe('set highlight method', () => {
  it('should return highlight', () => {
    const name = 'test name';
    const text = 'text example';
    const result = ['test', 'name'];
    expect(setHighlight(name, text)).toEqual(result);
  });
});

describe('set clone method', () => {
  it('should return a clone of the object', () => {
    const test_obj = {
      name: 'test obj',
      content: 'to test',
    };
    const clone_obj_test = clone(test_obj);
    test_obj.name = 'other name';
    const result = {
      name: 'test obj',
      content: 'to test',
    };
    expect(clone_obj_test).toEqual(result);
  });
});
