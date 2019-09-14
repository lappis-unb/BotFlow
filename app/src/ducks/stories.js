
import axios from "axios";
import { createActions, createReducer } from 'reduxsauce'
import { INTENT_URL, UTTER_URL, STORY_URL } from '../utils/url_routes.js';

const INITIAL_STATE = {
    intents: [],
    utters: [],
    content: [],
    story_id: "",
    notification_text: ""
};

function createArrayObjCopyOf(samples = []) {
    return samples.map(text => { return { ...text } });
}

export const getIntents = (state = INITIAL_STATE, action) => {

    return {
        ...state,
        intents: action.intents
    };
}

export const getUtters = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        utters: action.utters
    };
}

export const reorderContent = (state = INITIAL_STATE, action) => {
    const result = createArrayObjCopyOf(state.content);
    const [removed] = result.splice(action.start_index, 1);
    result.splice(action.end_index, 0, removed);

    return {
        ...state,
        content: result
    }
}

export const deleteContent = (state = INITIAL_STATE, action) => {
    let new_content = createArrayObjCopyOf(state.content);
    new_content.splice(action.content_position, 1);

    return {
        ...state,
        content: new_content
    }
}

export const notifyAction = (state = INITIAL_STATE, action) => {
    console.log("ENTROU AQUI", action.text)
    return {
        ...state,
        notification_text: action.text
    };
}

export const addToStory = (state = INITIAL_STATE, action) => {
    let new_content = createArrayObjCopyOf(state.content);
    new_content.push({ ...action.item, type: action.mode });

    return {
        ...state,
        content: new_content
    }
}

export const { Types, Creators } = createActions({
    notifyAction: ['text'],
    addToStory: ['item', 'mode'],
    deleteContent: ['content_position'],
    reorderContent: ['start_index', 'end_index'],
    addIntent: (intent) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(INTENT_URL + intent.id + '/example');
                await dispatch({ type: Types.ADD_TO_STORY, item: response.data, mode: "intent" });
            } catch (error) {
                throw (error);
            }
        }
    },
    addUtter: (utter) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(UTTER_URL + utter.id + '/example');
                await dispatch({ type: Types.ADD_TO_STORY, item: response.data, mode: "utter" });
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
            if ((item.id === "" || item.id === undefined)) {
                dispatch(createOrUpdateItem('post', item, "Story criada com sucesso!"));
            } else {
                dispatch(createOrUpdateItem('put', item, "Story atualizada com sucesso!"));
            }
        }
    },
    deleteStory: (story_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(STORY_URL + story_id);
                await dispatch(Creators.getIntents());
                await dispatch(Creators.notifyAction("Story removida com sucesso!"));
                await dispatch(Creators.createNewIntent())

            } catch (error) {
                throw (error);
            }
        }
    }

});

export const createOrUpdateItem = (mode = 'post', new_item, message = "") => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? STORY_URL : STORY_URL + new_item.id;
            await axios[mode](mode_url, new_item);
            dispatch(Creators.notifyAction(message));

        } catch (error) {
            throw (error);
        }
    }
};

export default createReducer(INITIAL_STATE, {
    [Types.GET_UTTERS]: getUtters,
    [Types.GET_INTENTS]: getIntents,
    [Types.ADD_TO_STORY]: addToStory,
    [Types.DELETE_CONTENT]: deleteContent,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.REORDER_CONTENT]: reorderContent,
});
