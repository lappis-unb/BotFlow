import { Utter } from '../../utils/DataFormat';
import {
  addUtterContent,
  setUtterContent,
  deleteUtterContent,
  undoDeleteUtterContent,
  selectUtter,
  createNewUtter,
  setUtterName,
  notifyAction,
  getUtters,
  changeUtterForm,
} from '../../ducks/utters';

import { clone } from '../../utils/utils';

const INITIAL_STATE = {
  mode: 'Utter',
  name: '',
  helper_text: '',
  old_name: '',
  notification_text: '',
  content: [['']],
  old_content: [['']],
  multiple_alternatives: false,
};

describe('add utter content method', () => {
  it('should add utter to state in sequence', () => {
    const new_state = clone(INITIAL_STATE);
    new_state.content = [['', '']];
    new_state.old_content = [['', '']];
    expect(addUtterContent(INITIAL_STATE)).toEqual(new_state);
  });

  it('should add utter to state in alternatives', () => {
    const state = clone(INITIAL_STATE);
    state.multiple_alternatives = true;
    const new_state = clone(state);
    new_state.content = [[''], ['']];
    new_state.old_content = [[''], ['']];
    expect(addUtterContent(state)).toEqual(new_state);
  });
});

describe('set utter content method', () => {
  it('should add content to state', () => {
    const action = {
      utter_position: 0,
      text_position: 0,
      text: 'test utter text',
    };
    const new_state = clone(INITIAL_STATE);
    new_state.content = [[action.text]];

    expect(setUtterContent(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('delete utter content method', () => {
  it('should delete utter content in state', () => {
    const action = {
      utter_position: 0,
      text_position: 1,
    };
    const state = clone(INITIAL_STATE);
    state.content = [['test1', 'test2']];
    const new_state = clone(INITIAL_STATE);
    new_state.content = [['test1']];
    new_state.old_content = state.content;

    expect(deleteUtterContent(state, action)).toEqual(new_state);
  });
});

describe('undo delete utter content', () => {
  it('should return to the old content', () => {
    const state = clone(INITIAL_STATE);
    state.content = [['test1']];
    state.old_content = [['test1', 'test2']];
    const new_state = clone(state);
    new_state.content = [['test1', 'test2']];

    expect(undoDeleteUtterContent(state)).toEqual(new_state);
  });
});

describe('select utter method', () => {
  it('should add utter info to state', () => {
    const utter_example = new Utter(1, 'test_utter', false, [['utter example']]);
    const action = {
      item: utter_example,
      item_position: 0,
    };
    const state = clone(INITIAL_STATE);
    state.utters = [utter_example];

    const new_state = clone(state);
    new_state.name = action.item.name;
    new_state.old_name = action.item.name;
    new_state.content = action.item.alternatives;
    new_state.old_content = action.item.alternatives;
    new_state.id = action.item.id;
    new_state.selected_item_position = 0;

    expect(selectUtter(state, action)).toEqual(new_state);
  });
});

describe('create new utter method', () => {
  it('should add new utter to state', () => {
    const new_utter = new Utter();
    const new_state = clone(INITIAL_STATE);
    new_state.id = new_utter.id;
    new_state.name = new_utter.name;
    new_state.old_name = new_utter.name;
    new_state.selected_item_position = -1;
    new_state.multiple_alternatives = new_utter.multiple_alternatives;
    new_state.content = new_utter.alternatives;
    new_state.old_content = new_utter.alternatives;

    expect(createNewUtter(INITIAL_STATE)).toEqual(new_state);
  });
});

describe('set utter name method', () => {
  it('should update utter name on state', () => {
    const action = {
      name: 'new name example',
      helper_text: 'helper text example',
    };
    const new_state = clone(INITIAL_STATE);
    new_state.name = action.name;
    new_state.helper_text = action.helper_text;

    expect(setUtterName(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('notify action method', () => {
  it('should update the notification text on state', () => {
    const action = {
      text: 'new notification example',
    };
    const new_state = clone(INITIAL_STATE);
    new_state.notification_text = action.text;

    expect(notifyAction(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('get utters method', () => {
  it('should add utters to state', () => {
    const utter1 = new Utter(1, 'test_utter1', false, [['utter example']]);
    const utter2 = new Utter(2, 'test_utter2', true, [['utter example'], ['another example']]);
    const action = {
      utters: [utter1, utter2],
    };
    const new_state = clone(INITIAL_STATE);
    new_state.utters = action.utters;

    expect(getUtters(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('change utter form method', () => {
  it('should change the utter content with sequence option', () => {
    const action = {
      content: [['utter example'], ['another example']],
      multiple_alternatives: false,
    };
    const new_state = clone(INITIAL_STATE);
    new_state.multiple_alternatives = action.multiple_alternatives;
    new_state.content = [['utter example', 'another example']];
    expect(changeUtterForm(INITIAL_STATE, action)).toEqual(new_state);
  });

  it('should change the utter content with alternatives option', () => {
    const action = {
      content: [['utter example', 'another example']],
      multiple_alternatives: true,
    };
    const new_state = clone(INITIAL_STATE);
    new_state.multiple_alternatives = action.multiple_alternatives;
    new_state.content = [['utter example'], ['another example']];
    expect(changeUtterForm(INITIAL_STATE, action)).toEqual(new_state);
  });
});
