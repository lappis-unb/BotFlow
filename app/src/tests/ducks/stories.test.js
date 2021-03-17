import { Story, Intent, Utter } from '../../utils/DataFormat';
import { clone } from '../../utils/utils';
import { message } from '../../utils/messages';

import {
  getIntents,
  getUtters,
  getStories,
  getStory,
  validationContent,
  reorderContent,
  deleteContent,
  undoDeleteContent,
  notifyAction,
  notifyContentTextValidation,
  addToStory,
  createNewStory,
  createOrUpdateItem,

} from '../../ducks/stories';

const INITIAL_STATE = {
  utters: [],
  intents: [],
  stories: [],
  content: [],
  name: '',
  old_content: [],
  story_id: '',
  notification_text: '',
  content_text_validation: '',
  loading: false,
};

describe('get intents method', () => {
  it('should add intents to the state', () => {
    const intent = new Intent();
    const action = {
      intents: [intent],
    };
    const new_state = clone(INITIAL_STATE);
    new_state.intents = action.intents;

    expect(getIntents(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('get utters method', () => {
  it('should add utters to the state', () => {
    const utter = new Utter();
    const action = {
      utters: [utter],
    };
    const new_state = clone(INITIAL_STATE);
    new_state.utters = action.utters;

    expect(getUtters(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('get stories method', () => {
  it('should add stories to the state', () => {
    const story = new Story();
    const action = {
      stories: [story],
    };
    const new_state = clone(INITIAL_STATE);
    new_state.stories = action.stories;

    expect(getStories(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('get story method', () => {
  it('should add the story content to the state', () => {
    const story = new Story(1, 'story_test_1', [{ id: 1, type: 'intent' }]);
    const action = {
      story,
    };
    const new_state = clone(INITIAL_STATE);
    new_state.name = action.story.name;
    new_state.story_id = action.story.id;
    new_state.content = action.story.content;
    new_state.old_content = action.story.content;

    expect(getStory(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('validate content method', () => {
  it('should warn about two intents problem', () => {
    const content = [{ id: 1, type: 'utter' }, { id: 1, type: 'intent' }, { id: 2, type: 'intent' }];
    expect(validationContent(content)).toEqual(message.story.two_intents);
  });

  it('should warn about starting with intents problem', () => {
    const content = [{ id: 1, type: 'utter' }, { id: 1, type: 'intent' }, { id: 1, type: 'utter' }];
    expect(validationContent(content)).toEqual(message.story.first_element);
  });

  it('should return a empty string when everything is fine', () => {
    const content = [{ id: 1, type: 'intent' }, { id: 1, type: 'utter' }];
    expect(validationContent(content)).toEqual('');
  });
});

describe('reorder content method', () => {
  it('should reorder the content', () => {
    const state = clone(INITIAL_STATE);
    state.content = [{ id: 1, type: 'intent' }, { id: 2, type: 'utter' }, { id: 3, type: 'utter' }];
    const action = {
      start_index: 1,
      end_index: 2,
    };
    const new_state = clone(INITIAL_STATE);
    new_state.content = [{ id: 1, type: 'intent' }, { id: 3, type: 'utter' }, { id: 2, type: 'utter' }];
    new_state.old_content = state.content;
    expect(reorderContent(state, action)).toEqual(new_state);
  });
});

describe('delete content method', () => {
  it('should delete the selected content from state', () => {
    const state = clone(INITIAL_STATE);
    state.content = [{ id: 1, type: 'intent' }, { id: 2, type: 'utter' }, { id: 3, type: 'utter' }];
    const action = {
      content_position: 2,
    };
    const new_state = clone(state);
    new_state.content = [{ id: 1, type: 'intent' }, { id: 2, type: 'utter' }];
    new_state.old_content = state.content;
    expect(deleteContent(state, action)).toEqual(new_state);
  });
});
describe('undo delete content method', () => {
  it('should return to the previous state', () => {
    const state = clone(INITIAL_STATE);
    state.content = [{ id: 1, type: 'intent' }, { id: 2, type: 'utter' }];
    state.old_content = [{ id: 1, type: 'intent' }, { id: 2, type: 'utter' }, { id: 3, type: 'utter' }];

    const new_state = clone(INITIAL_STATE);
    new_state.content = state.old_content;
    new_state.old_content = state.old_content;

    expect(undoDeleteContent(state)).toEqual(new_state);
  });
});

describe('notify action method', () => {
  it('should add to state the notification text', () => {
    const action = {
      text: 'notification text example',
    };

    const new_state = clone(INITIAL_STATE);
    new_state.notification_text = action.text;

    expect(notifyAction(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('notify content text validation method', () => {
  it('should add to state the content text validation', () => {
    const action = {
      text: 'text example',
    };

    const new_state = clone(INITIAL_STATE);
    new_state.content_text_validation = action.text;

    expect(notifyContentTextValidation(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('add to story method', () => {
  it('should add content to story', () => {
    const action = {
      mode: 'intent',
      item: 1,
    };
    const new_state = clone(INITIAL_STATE);
    new_state.content = [{ ...action.item, type: action.mode }];

    expect(addToStory(INITIAL_STATE, action)).toEqual(new_state);
  });
});

describe('create new story method', () => {
  it('should return the story states to adapt to a new story', () => {
    const state = clone(INITIAL_STATE);
    state.name = 'teste 1';
    state.notification_text = 'notification example';
    state.story_id = 1;
    expect(createNewStory(state)).toEqual(INITIAL_STATE);
  });
});
