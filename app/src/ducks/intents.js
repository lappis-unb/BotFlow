import axios from 'axios';
import { Intent } from '../utils/DataFormat.js'
import { createActions, createReducer } from 'reduxsauce'
import { INTENT_URL } from '../utils/url_routes.js'

const INITIAL_STATE = {
    mode: 'Intent',
    name_intent: '',
    helper_text: '',
    old_name_intent: '',
    notification_text: '',
    intent_contents: [''],
    old_intent_contents: [''],
};

export const addIntent = (state = INITIAL_STATE) => {
    let new_intent = [...state.intent_contents];
    new_intent.push('')

    return {
        ...state,
        intent_contents: new_intent,
        old_intent_contents: [...new_intent]
    };
}

export const setIntentContent = (state = INITIAL_STATE, action) => {
    let intent_contents = [...state.intent_contents];
    intent_contents[action.intent_position] = action.text

    return {
        ...state,
        intent_contents: intent_contents
    };
}

export const deleteIntentContent = (state = INITIAL_STATE, action) => {
    let intent_contents = [...state.intent_contents]
    let old_item_history = [...state.intent_contents]

    intent_contents.splice(action.intent_position, 1);

    return {
        ...state,
        intent_contents: intent_contents,
        old_intent_contents: old_item_history
    };
}

export const undoDeleteIntentContent = (state = INITIAL_STATE) => {
    return {
        ...state,
        intent_contents: [...state.old_intent_contents]
    }
}

export const selectIntent = (state = INITIAL_STATE, action) => {
    let selected_item = action.item;
    let selected_item_position = action.item_position;

    if (selected_item_position < 0) {
        state.intents.find((item, index) => {
            selected_item_position = index;
            return (item.id === action.item.id || item.name === action.item.name);
        });
    }

    return {
        ...state,
        id: selected_item.id,
        name_intent: selected_item.name,
        old_name_intent: selected_item.name,
        selected_item_position: selected_item_position,
        intent_contents: [...selected_item.samples],
        old_intent_contents: [...selected_item.samples],
        helper_text: ''
    };
}

export const createNewIntent = (state = INITIAL_STATE) => {
    const new_intent = new Intent();

    return {
        ...state,
        id: new_intent.id,
        selected_item_position: -1,
        name_intent: new_intent.name,
        old_name_intent: new_intent.name,
        intent_contents: [...new_intent.samples],
        old_intent_contents: [...new_intent.samples]
    };
}

export const setIntentName = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        name_intent: action.name_intent,
        helper_text: action.helper_text
    };
}

export const notifyAction = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        notification_text: action.text
    };
}

export const getIntents = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        intents: action.intents
    };
}

export const createOrUpdateItem = (mode = 'post', new_item, message = '') => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? INTENT_URL : INTENT_URL + new_item.id;
            let intent;
            await axios[mode](mode_url, new_item)
                .then((resp) => {
                    intent = resp.data;
                })

            await dispatch(Creators.getIntents());
            await dispatch(Creators.selectIntent(intent, -1));

            dispatch(Creators.notifyAction(message));
        } catch (error) {
            throw (error);
        }
    }
};


export const { Types, Creators } = createActions({
    addIntent: [],
    notifyAction: ['text'],
    createNewIntent: [],
    undoDeleteIntentContent: [],
    deleteIntentContent: ['intent_position'],
    setIntentName: ['name_intent', 'helper_text'],
    setIntentContent: ['intent_position', 'text'],
    selectIntent: (intent = '', item_position = '') => {
        return async (dispatch) => {
            try {
                const response = await axios.get(INTENT_URL + intent.id);

                await dispatch({ type: Types.SELECT_INTENT, item: response.data, item_position: item_position });
            } catch (error) {
                throw (error);
            }
        }
    },
    getIntents: () => {
        return async (dispatch) => {
            try {
                const response = await axios.get(INTENT_URL);
                await dispatch({ type: Types.GET_INTENTS, intents: response.data });
            } catch (error) {
                throw (error);
            }
        }
    },
    saveData: (item) => {
        return async (dispatch) => {
            if (item.id === '' || item.id === undefined) {
                dispatch(createOrUpdateItem('post', item, 'Intent criada com sucesso!'));
            } else {
                dispatch(createOrUpdateItem('put', item, 'Intent atualizada com sucesso!'));
            }
        }
    },
    deleteIntent: (delete_intent_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(INTENT_URL + delete_intent_id);
                await dispatch(Creators.getIntents());
                await dispatch(Creators.notifyAction('Intent removida com sucesso!'));
                await dispatch(Creators.createNewIntent())

            } catch (error) {
                throw (error);
            }
        }
    }
})

export default createReducer(INITIAL_STATE, {
    [Types.ADD_INTENT]: addIntent,
    [Types.GET_INTENTS]: getIntents,
    [Types.SELECT_INTENT]: selectIntent,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.SET_INTENT_NAME]: setIntentName,
    [Types.CREATE_NEW_INTENT]: createNewIntent,
    [Types.SET_INTENT_CONTENT]: setIntentContent,
    [Types.DELETE_INTENT_CONTENT]: deleteIntentContent,
    [Types.UNDO_DELETE_INTENT_CONTENT]: undoDeleteIntentContent,
});



