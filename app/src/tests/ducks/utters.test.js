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
    createOrUpdateItem
} from '../../ducks/utters';

import { clone } from '../../utils/utils';

const INITIAL_STATE = {
    mode: "Utter",
    name: "",
    helper_text: "",
    old_name: "",
    notification_text: "",
    content: [[""]],
    old_content: [[""]],
    multiple_alternatives: false,
};

describe('add utter content method', () => {
    it('should add utter to state in sequence', () => {
        let new_state = clone(INITIAL_STATE);
        new_state.content = [['', '']]
        new_state.old_content = [['', '']]
        expect(addUtterContent(INITIAL_STATE)).toEqual(new_state);
    })

    it('should add utter to state in alternatives', () => {
        let state = clone(INITIAL_STATE);
        state.multiple_alternatives = true
        let new_state = clone(state);
        new_state.content = [[''], ['']]
        new_state.old_content = [[''], ['']]
        expect(addUtterContent(state)).toEqual(new_state);
    })
})

describe('set utter content method', () => {
    it('should add content to state', () =>{
        let action = {
            utter_position: 0,
            text_position: 0,
            text: 'test utter text'
        }
        let new_state = clone(INITIAL_STATE);
        new_state.content = [[action.text]];

        expect(setUtterContent(INITIAL_STATE, action)).toEqual(new_state);
    })
})

describe('delete utter content method', () => {
    it('should delete utter content in state', () =>{
        let action = {
            utter_position: 0,
            text_position: 1
        }
        let state = clone(INITIAL_STATE);
        state.content = [['test1', 'test2']];
        let new_state = clone(INITIAL_STATE);
        new_state.content = [['test1']];
        new_state.old_content = state.content;

        expect(deleteUtterContent(state, action)).toEqual(new_state);
    })
})

describe('undo delete utter content', () => {
    it('should return to the old content', () => {
        let state = clone(INITIAL_STATE);
        state.content = [['test1']];
        state.old_content = [['test1', 'test2']];
        let new_state = clone(state)
        new_state.content = [['test1', 'test2']];

        expect(undoDeleteUtterContent(state)).toEqual(new_state)
    })
})

describe('select utter method', () => {
    it('should add utter info to state', () => {
        let action = {
            item: new Utter(1, 'test_utter', false, [['utter example']])
        }
    })
})