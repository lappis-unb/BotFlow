import { Intent } from '../../utils/DataFormat';
import {
  addIntent,
  setIntentContent,
  deleteIntentContent,
  undoDeleteIntentContent,
  selectIntent,
  createNewIntent,
  setIntentName,
  notifyAction,
  getIntents,
} from '../../ducks/intents';

import { clone } from '../../utils/utils';

const INITIAL_STATE = {
  intents: [],
  mode: 'Intent',
  name: '',
  helper_text: '',
  old_name: '',
  notification_text: '',
  content: [''],
  old_content: [''],
};

describe('add intent method', () => {
  it('should add an empty intent sample to state', () => {
    const state = clone(INITIAL_STATE);
    state.content = ['', ''];
    state.old_content = ['', ''];
    expect(addIntent()).toEqual(state);
  });
});

describe('set intent content method', () => {
  it('should set content to intent', () => {
    const action = {
      text: 'test',
      intent_position: 0,
    };
    const new_state = setIntentContent(INITIAL_STATE, action);
    const state = clone(INITIAL_STATE);
    state.content = ['test'];
    expect(new_state).toEqual(state);
  });
});

describe('delete intent content method', () => {
  it('should delete intent content sample to state', () => {
    const action = {
      intent_position: 0,
    };
    const state = clone(INITIAL_STATE);
    state.content = ['test', 'test2'];
    const new_state = clone(state);
    new_state.content = ['test2'];
    new_state.old_content = ['test', 'test2'];
    expect(deleteIntentContent(state, action)).toEqual(new_state);
  });
});

describe('undo delete intent content method', () => {
  it('shoud set the intent content to the old state', () => {
    const state = clone(INITIAL_STATE);
    state.content = ['test2'];
    state.old_content = ['test', 'test2'];
    const new_state = clone(state);
    new_state.content = state.old_content;
    expect(undoDeleteIntentContent(state)).toEqual(new_state);
  });
});

describe('select intent method', () => {
  it('shoud set the selected item to the intent requested', () => {
    const intent_test = new Intent(1, 'intent_test', ['test_sample1', 'test_sample2']);
    const action = {
      item: intent_test,
      item_position: 0,
    };
    const state = clone(INITIAL_STATE);
    state.intents.push(intent_test);
    const new_state = clone(state);
    new_state.id = intent_test.id;
    new_state.name = intent_test.name;
    new_state.old_name = intent_test.name;
    new_state.selected_item_position = 0;
    new_state.content = intent_test.samples;
    new_state.old_content = intent_test.samples;

    expect(selectIntent(state, action)).toEqual(new_state);
  });
});

describe('create new intent method', () => {
  it('should create a new intent', () => {
    const new_state = clone(INITIAL_STATE);
    const intent_test = new Intent();
    new_state.id = intent_test.id;
    new_state.selected_item_position = -1;
    new_state.name = intent_test.name;
    new_state.old_name = intent_test.name;
    new_state.content = [...intent_test.samples];
    new_state.old_content = [...intent_test.samples];

    expect(createNewIntent(INITIAL_STATE)).toEqual(new_state);
  });
});

describe('set intent name method', () => {
  it('should update the name', () => {
    const action = {
      name: 'new name test',
      helper_text: 'helper text test',
    };
    const new_state = clone(INITIAL_STATE);
    new_state.name = action.name;
    new_state.helper_text = action.helper_text;

    expect(setIntentName(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('notify action method', () => {
  it('should update the notification text', () => {
    const action = {
      text: 'new notification',
    };
    const new_state = clone(INITIAL_STATE);
    new_state.notification_text = action.text;

    expect(notifyAction(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('get intents method', () => {
  it('should update the intents state', () => {
    const action = {
      intents: [
        new Intent(1, 'intent_test', ['sample_test']),
      ],
    };
    const new_state = clone(INITIAL_STATE);
    new_state.intents = action.intents;

    expect(getIntents(INITIAL_STATE, action)).toEqual(new_state);
  });
});

// describe('create or update item method', () => {
//     it('should create or update a new item', () => {

//     })
// })
