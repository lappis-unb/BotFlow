import axios from 'axios';
import { message } from '../utils/messages';
import { Intent } from '../utils/DataFormat.js';
import { INTENT_URL } from '../utils/url_routes.js';
import { createActions, createReducer } from 'reduxsauce';

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


function sendAlert(response) {
    if (response.status === 404) {
        alert("Desculpe, não foi possível encontrar o objeto de pesquisa!");
    } else if (response.status === 400) {
        alert("Desculpe, algum caracter inválido foi inserido ou falta alguma informação\nFavor revisar.")
    }
    else if (response.status === undefined) {
        alert("Desculpe, houve um erro de rede.\nFavor verificar a conexão!");
    }
}

export const addIntent = (state = INITIAL_STATE) => {
    let new_intent = [...state.content];
    new_intent.push('')

    return {
        ...state,
        content: new_intent,
        old_content: [...new_intent]
    };
}

export const setIntentContent = (state = INITIAL_STATE, action) => {
    let content = [...state.content];
    content[action.intent_position] = action.text

    return {
        ...state,
        content: content
    };
}

export const deleteIntentContent = (state = INITIAL_STATE, action) => {
    let content = [...state.content]
    let old_item_history = [...state.content]

    content.splice(action.intent_position, 1);

    return {
        ...state,
        content: content,
        old_content: old_item_history
    };
}

export const undoDeleteIntentContent = (state = INITIAL_STATE) => {
    return {
        ...state,
        content: [...state.old_content]
    }
}

export const selectIntent = (state = INITIAL_STATE, action) => {
    let selected_item = action.item;
    let selected_item_position = action.item_position;
    let nonEmptySamples=[];
    
    if (selected_item_position < 0) {
        state.intents.find((item, index) => {
            selected_item_position = index;
            return (item.id === action.item.id || item.name === action.item.name);
        });
    }

    selected_item.samples.forEach(sample => {
        if (sample.trim().length !== 0) { 
          nonEmptySamples.push(sample);
        } 
    });

    selected_item.samples=nonEmptySamples;

    return {
        ...state,
        id: selected_item.id,
        name: selected_item.name,
        old_name: selected_item.name,
        selected_item_position: selected_item_position,
        content: [...selected_item.samples],
        old_content: [...selected_item.samples],
        helper_text: ''
    };
}

export const createNewIntent = (state = INITIAL_STATE) => {
    const new_intent = new Intent();

    return {
        ...state,
        id: new_intent.id,
        selected_item_position: -1,
        name: new_intent.name,
        old_name: new_intent.name,
        content: [...new_intent.samples],
        old_content: [...new_intent.samples]
    };
}

export const setIntentName = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        name: action.name,
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
                });

            await dispatch(Creators.getIntents());
            await dispatch(Creators.selectIntent(intent.id, -1));

            dispatch(Creators.notifyAction(message));
        } catch (error) {
            sendAlert(error.response);
            throw (error);
        }
    }
};

export const { Types, Creators } = createActions({
    addIntent: [],
    createNewIntent: [],
    notifyAction: ['text'],
    undoDeleteIntentContent: [],
    setIntentName: ['name', 'helper_text'],
    deleteIntentContent: ['intent_position'],
    setIntentContent: ['intent_position', 'text'],
    selectIntent: (id = '', item_position = -1) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(INTENT_URL + id);
                await dispatch({ type: Types.SELECT_INTENT, item: response.data, item_position: item_position });
            } catch (error) {
                sendAlert(error.response);
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
                sendAlert(error.response);
                throw (error);
            }
        }
    },
    saveData: (item) => {
        return async (dispatch) => {
            if (item.id === '' || item.id === undefined) {
                dispatch(createOrUpdateItem('post', item, message.intent.created));
            } else {
                dispatch(createOrUpdateItem('put', item, message.intent.updated));
            }
        }
    },
    deleteIntent: (delete_intent_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(INTENT_URL + delete_intent_id);

                await dispatch(Creators.getIntents());
                await dispatch(Creators.notifyAction(message.intent.deleted));
                await dispatch(Creators.createNewIntent())
                

            } catch (error) {
                sendAlert(error.response);
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



