import axios from 'axios';
import { Utter } from '../utils/DataFormat.js';
import { message } from '../utils/messages.js';
import { UTTER_URL } from '../utils/url_routes.js';
import { createActions, createReducer } from 'reduxsauce';

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

function createArrayCopyOf(items) {
    if (items !== undefined) {
        return items.map(utter => utter.map(text => text));
    }
    return items;
}

export const addUtterContent = (state = INITIAL_STATE) => {
    let new_utter = createArrayCopyOf(state.content);

    if (state.multiple_alternatives) {
        new_utter.push(['']);
    } else {
        new_utter[0].push('');
    }

    return {
        ...state,
        content: new_utter,
        old_content: createArrayCopyOf(new_utter)
    };
}

export const setUtterContent = (state = INITIAL_STATE, action) => {
    let content = createArrayCopyOf(state.content);
    content[action.utter_position][action.text_position] = action.text

    return {
        ...state,
        content: content
    };
}

export const deleteUtterContent = (state = INITIAL_STATE, action) => {
    let content = createArrayCopyOf(state.content)
    let old_utter_history = createArrayCopyOf(state.content)

    content[action.utter_position].splice(action.text_position, 1);
    if (content[action.utter_position].length === 0) {
        content.splice(action.utter_position, 1);
    }

    return {
        ...state,
        content: content,
        old_content: old_utter_history
    };
}

export const undoDeleteUtterContent = (state = INITIAL_STATE) => {
    return {
        ...state,
        content: createArrayCopyOf(state.old_content)
    }
}

export const selectUtter = (state = INITIAL_STATE, action) => {
    let selected_item = action.item;
    let selected_item_position = action.item_position;

    if (selected_item_position < 0) {
        state.utters.find((item, index) => {
            selected_item_position = index;
            return (item.id === action.item.id || item.name === action.item.name);
        });
    }

    return {
        ...state,
        helper_text: "",
        id: selected_item.id,
        name: selected_item.name,
        old_name: selected_item.name,
        selected_item_position: selected_item_position,
        content: createArrayCopyOf(selected_item.alternatives),
        old_content: createArrayCopyOf(selected_item.alternatives),
        multiple_alternatives: selected_item.multiple_alternatives,
    };
}

export const createNewUtter = (state = INITIAL_STATE) => {
    const new_utter = new Utter();

    return {
        ...state,
        helper_text: "",
        id: new_utter.id,
        name: new_utter.name,
        old_name: new_utter.name,
        selected_item_position: -1,
        multiple_alternatives: new_utter.multiple_alternatives,
        content: createArrayCopyOf(new_utter.alternatives),
        old_content: createArrayCopyOf(new_utter.alternatives),
    };
}

export const setUtterName = (state = INITIAL_STATE, action) => {
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

export const getUtters = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        utters: action.utters
    };
}

export const changeUtterForm = (state = INITIAL_STATE, action) => {
    let texts = [];
    let new_alternatives = [];

    action.content.forEach(i => {
        i.forEach(j => texts.push(j))
    })

    if (action.multiple_alternatives) {
        new_alternatives = texts.map(text => [text]);
    } else {
        new_alternatives = [texts.map(text => text)];
    }

    return {
        ...state,
        content: new_alternatives,
        multiple_alternatives: action.multiple_alternatives
    }
}

export const createOrUpdateItem = (mode = 'post', new_item, message = "") => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? UTTER_URL : UTTER_URL + new_item.id;
            let utter;
            await axios[mode](mode_url, new_item)
                .then((resp) => {
                    utter = resp.data;
                })
            await dispatch(Creators.getUtters());
            await dispatch(Creators.selectUtter(utter.id, -1));

            await dispatch(Creators.notifyAction(message));
        } catch (error) {
            throw (error);
        }
    }
};

export const { Types, Creators } = createActions({
    createNewUtter: [],
    addUtterContent: [],
    notifyAction: ['text'],
    undoDeleteUtterContent: [],
    setUtterName: ['name', 'helper_text'],
    deleteUtterContent: ['utter_position', 'text_position'],
    setUtterContent: ['text', 'utter_position', 'text_position'],
    changeUtterForm: ['content', 'multiple_alternatives'],
    selectUtter: (id = "", item_position = "") => {
        return async (dispatch) => {
            try {
                const response = await axios.get(UTTER_URL + id);
                await dispatch({ type: Types.SELECT_UTTER, item: response.data, item_position: item_position });
            } catch (error) {
                throw (error);
            }
        }
    },
    getUtters: () => {
        return async (dispatch) => {
            try {
                const response = await axios.get(UTTER_URL);
                await dispatch({ type: Types.GET_UTTERS, utters: response.data });
            } catch (error) {
                throw (error);
            }
        }
    },
    saveData: (item) => {
        return async (dispatch) => {
            if (item.id === "" || item.id === undefined) {
                dispatch(createOrUpdateItem('post', item, message.utter.created));
            } else {
                dispatch(createOrUpdateItem('put', item, message.utter.updated));
            }
        }
    },
    deleteUtter: (delete_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(UTTER_URL + delete_id);
                await dispatch(Creators.getUtters());
                await dispatch(Creators.notifyAction(message.utter.deleted));
                await dispatch(Creators.createNewUtter())

            } catch (error) {
                throw (error);
            }
        }
    }
})

export default createReducer(INITIAL_STATE, {
    [Types.GET_UTTERS]: getUtters,
    [Types.SELECT_UTTER]: selectUtter,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.SET_UTTER_NAME]: setUtterName,
    [Types.CREATE_NEW_UTTER]: createNewUtter,
    [Types.SET_UTTER_CONTENT]: setUtterContent,
    [Types.CHANGE_UTTER_FORM]: changeUtterForm,
    [Types.ADD_UTTER_CONTENT]: addUtterContent,
    [Types.DELETE_UTTER_CONTENT]: deleteUtterContent,
    [Types.UNDO_DELETE_UTTER_CONTENT]: undoDeleteUtterContent,
});
