import axios from 'axios';
import { Utter } from '../utils/DataFormat.js'
import { createActions, createReducer } from 'reduxsauce'
import { UTTER_URL } from '../utils/url_routes.js'

const INITIAL_STATE = {
    mode: "Utter",
    name: "",
    helper_text: "",
    old_name: "",
    notification_text: "",
    utter_contents: [[""]],
    old_utter_contents: [[""]],
    multiple_alternatives: false,
};


function createArrayCopyOf(items) {
    if (items !== undefined) {
        return items.map(utter => utter.map(text => text));
    }
    return items;
}

export const addUtterContent = (state = INITIAL_STATE) => {
    let new_utter = createArrayCopyOf(state.utter_contents);

    if (state.multiple_alternatives) {
        new_utter.push(['']);
    } else {
        new_utter[0].push('');
    }

    return {
        ...state,
        utter_contents: new_utter,
        old_utter_contents: createArrayCopyOf(new_utter)
    };
}

export const setUtterContent = (state = INITIAL_STATE, action) => {
    let utter_contents = createArrayCopyOf(state.utter_contents);
    utter_contents[action.utter_position][action.text_position] = action.text

    return {
        ...state,
        utter_contents: utter_contents
    };
}

export const deleteUtterContent = (state = INITIAL_STATE, action) => {
    let utter_contents = createArrayCopyOf(state.utter_contents)
    let old_utter_history = createArrayCopyOf(state.utter_contents)

    utter_contents[action.utter_position].splice(action.text_position, 1);
    if (utter_contents[action.utter_position].length === 0) {
        utter_contents.splice(action.utter_position, 1);
    }

    return {
        ...state,
        utter_contents: utter_contents,
        old_utter_contents: old_utter_history
    };
}

export const undoDeleteUtterContent = (state = INITIAL_STATE) => {
    return {
        ...state,
        utter_contents: createArrayCopyOf(state.old_utter_contents)
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
        utter_contents: createArrayCopyOf(selected_item.alternatives),
        old_utter_contents: createArrayCopyOf(selected_item.alternatives),
        multiple_alternatives: selected_item.multiple_alternatives,
    };
}

export const createNewUtter = (state = INITIAL_STATE) => {
    const new_utter = new Utter();

    return {
        ...state,
        helper_text: "",
        id: new_utter.id,
        selected_item_position: -1,
        name: new_utter.name,
        old_name: new_utter.name,
        utter_contents: createArrayCopyOf(new_utter.alternatives),
        old_utter_contents: createArrayCopyOf(new_utter.alternatives),
        multiple_alternatives: new_utter.multiple_alternatives,
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

    action.utter_contents.forEach(i => {
        i.forEach(j => texts.push(j))
    })

    if (action.multiple_alternatives) {
        new_alternatives = texts.map(text => [text]);
    } else {
        new_alternatives = [texts.map(text => text)];
    }

    return {
        ...state,
        utter_contents: new_alternatives,
        multiple_alternatives: action.multiple_alternatives
    }
}

export const createOrUpdateItem = (mode = 'post', new_item, message = "") => {
    return async (dispatch) => {
        try {
            console.log("UTE", new_item)
            const mode_url = (mode === 'post') ? UTTER_URL : UTTER_URL + new_item.id;
            let utter;
            await axios[mode](mode_url, new_item)
                .then((resp) => {
                    utter = resp.data;
                })
            console.log("NEW", utter)
            await dispatch(Creators.getUtters());
            await dispatch(Creators.selectUtter(utter, -1));

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
    deleteUtterContent: ['utter_position', 'text_position'],
    setUtterName: ['name', 'helper_text'],
    setUtterContent: ['text', 'utter_position', 'text_position'],
    changeUtterForm: ['utter_contents', 'multiple_alternatives'],
    selectUtter: (utter = "", item_position = "") => {
        return async (dispatch) => {
            try {
                const response = await axios.get(UTTER_URL + utter.id);

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
                dispatch(createOrUpdateItem('post', item, "Utter criada com sucesso!"));
            } else {
                dispatch(createOrUpdateItem('put', item, "Utter atualizada com sucesso!"));
            }
        }
    },
    deleteUtter: (delete_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(UTTER_URL + delete_id);
                await dispatch(Creators.getUtters());
                await dispatch(Creators.notifyAction("Utter removida com sucesso!"));
                await dispatch(Creators.createNewUtter())

            } catch (error) {
                throw (error);
            }
        }
    }
})

export default createReducer(INITIAL_STATE, {
    [Types.ADD_UTTER_CONTENT]: addUtterContent,
    [Types.GET_UTTERS]: getUtters,
    [Types.SELECT_UTTER]: selectUtter,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.SET_UTTER_NAME]: setUtterName,
    [Types.CREATE_NEW_UTTER]: createNewUtter,
    [Types.SET_UTTER_CONTENT]: setUtterContent,
    [Types.CHANGE_UTTER_FORM]: changeUtterForm,
    [Types.DELETE_UTTER_CONTENT]: deleteUtterContent,
    [Types.UNDO_DELETE_UTTER_CONTENT]: undoDeleteUtterContent,
});



