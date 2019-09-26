import {
    addIntent,
    setIntentContent,
    deleteIntentContent,
    undoDeleteIntentContent,
    selectIntent
} from '../ducks/intents';

const INITIAL_STATE = {
    mode: 'Intent',
    name_intent: '',
    helper_text: '',
    old_name_intent: '',
    notification_text: '',
    intent_contents: [''],
    old_intent_contents: [''],
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


describe('add intent method', () => {
    it('should add an empty intent sample to state', () => {
        let state =  clone(INITIAL_STATE);
        state.intent_contents = ['', '']
        state.old_intent_contents = ['', '']
        expect(addIntent()).toEqual(state);
    })
})

describe('set intent content method', () => {
    it('should set content to intent', () => {
        let action = {
            text: 'test',
            intent_position: 0
        };
        let new_state = setIntentContent(INITIAL_STATE, action)
        let state = clone(INITIAL_STATE);
        state.intent_contents = ['test'];
        expect(new_state).toEqual(state);
    })
})

describe('delete intent content method', () => {
    it('should delete intent content sample to state', () => {
        let action = {
            intent_position: 0
        };
        let state = clone(INITIAL_STATE);
        state.intent_contents = ['test', 'test2'];
        let new_state = clone(state);
        new_state.intent_contents = ['test2'];
        new_state.old_intent_contents = ['test', 'test2'];
        expect(deleteIntentContent(state, action)).toEqual(new_state);
    })
})

describe('undo delete intent content method',() => {
    it('shoud set the intent content to the old state', () => {
        let state = clone(INITIAL_STATE);
        state.intent_contents = ['test2'];
        state.old_intent_contents = ['test', 'test2'];
        let new_state = clone(state);
        new_state.intent_contents = state.old_intent_contents;
        expect(undoDeleteIntentContent(state)).toEqual(new_state)
    })
})

describe('select intent method',() => {
    it('shoud set the selected item to the intent requested', () => {
        let state = clone(INITIAL_STATE);
    })
})