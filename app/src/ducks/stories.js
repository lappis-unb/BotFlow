
import axios from "axios";
import { Story } from '../utils/DataFormat';
import { message } from '../utils/messages';
import { createActions, createReducer } from 'reduxsauce';
import { INTENT_URL, UTTER_URL, STORY_URL } from '../utils/url_routes.js';

const INITIAL_STATE = {
    utters: [],
    intents: [],
    stories: [],
    content: [],
    loading: true,
    name: "",
    old_content: [],
    story_id: "",
    notification_text: "",
    content_text_validation: ""
};

function sendAlert(response) {
    if (response === undefined ) {
        alert('Desculpe! Não conseguimos conectar. Verifique sua conexão com a internet ou nossas redes sociais para checar se estamos online!');
        return;
    }

    if (response.status === 404) {
        alert("Desculpe, não foi possível encontrar o objeto de pesquisa!");
    } else if (response.status === 400) {
        alert("Desculpe, algum caracter inválido foi inserido ou falta alguma informação\nFavor revisar.")
    }
    else if (response.status === undefined) {
        alert("Desculpe, houve um erro de rede.\nFavor verificar a conexão!");
    }
}

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

export const getStories = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        stories: action.stories,
        loading: false
    };
}

export const getStory = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        name: action.story.name,
        story_id: action.story.id,
        content: action.story.content,
        old_content: action.story.content
    };
}

export const validationContent = (content) => {
    let intent_intent = true;

    for (let i = 1, size = content.length; i < size; i++) {
        if (content[i - 1].type === 'intent' && (content[i].type === 'intent')) {
            intent_intent = false;
        } else if (content[size - 1].type === 'intent') {
            intent_intent = false;
        }
    }

    if (!intent_intent) {
        return message.story.two_intents;
    } else if (content.length !== 0 && content[0].type !== 'intent') {
        return message.story.first_element;
    }

    return '';
}

export const reorderContent = (state = INITIAL_STATE, action) => {
    const result = createArrayObjCopyOf(state.content);
    const [removed] = result.splice(action.start_index, 1);
    result.splice(action.end_index, 0, removed);

    const text = validationContent(result);

    return {
        ...state,
        content: result,
        content_text_validation: text,
        old_content: createArrayObjCopyOf(state.content)
    }
}

export const deleteContent = (state = INITIAL_STATE, action) => {
    let new_content = createArrayObjCopyOf(state.content);
    new_content.splice(action.content_position, 1);

    const text = validationContent(new_content);

    return {
        ...state,
        content: new_content,
        content_text_validation: text,
        old_content: createArrayObjCopyOf(state.content)
    }
}

export const undoDeleteContent = (state = INITIAL_STATE) => {
    const text = validationContent(state.old_content);
    
    return {
        ...state,
        content_text_validation: text,
        content: createArrayObjCopyOf(state.old_content)
    }
}

export const notifyAction = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        notification_text: action.text
    };
}

export const notifyContentTextValidation = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        content_text_validation: action.text
    };
}

export const addToStory = (state = INITIAL_STATE, action) => {
    let new_content = createArrayObjCopyOf(state.content);
    new_content.push({ ...action.item, type: action.mode });
    const text = validationContent(new_content);

    return {
        ...state,
        content: new_content,
        content_text_validation: text,
        old_content: createArrayObjCopyOf(state.content),
    }
}

export const createNewStory = (state = INITIAL_STATE) => {
    const new_story = new Story();

    return {
        ...state,
        name: new_story.name,
        notification_text: '',
        story_id: new_story.id,
        content: createArrayObjCopyOf(new_story.content),
        old_content: createArrayObjCopyOf(new_story.content)
    };
}

export const createOrUpdateItem = (mode = 'post', new_item, message = "") => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? STORY_URL : STORY_URL + new_item.id;
            const response = await axios[mode](mode_url, new_item);
            await dispatch(Creators.getStory(response.data.id));
            await dispatch(Creators.notifyAction(message));
        } catch (error) {
            sendAlert(error.response);
            throw (error);
        }
    }
};

export const { Types, Creators } = createActions({
    createNewStory: [],
    undoDeleteContent: [],
    notifyAction: ['text'],
    addToStory: ['item', 'mode'],
    deleteContent: ['content_position'],
    notifyContentTextValidation: ['text'],
    reorderContent: ['start_index', 'end_index'],
    addIntent: (intent) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(INTENT_URL + intent.id + '/example');
                await dispatch({ type: Types.ADD_TO_STORY, item: response.data, mode: "intent" });
            } catch (error) {
                sendAlert(error.response);
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
    getUtters: () => {
        return async (dispatch) => {
            try {
                const response = await axios.get(UTTER_URL);
                await dispatch({ type: Types.GET_UTTERS, utters: response.data });
            } catch (error) {
                sendAlert(error.response);
                throw (error);
            }
        }
    },
    saveData: (item) => {
        return async (dispatch) => {
            if ((item.id === "" || item.id === undefined)) {
                dispatch(createOrUpdateItem('post', item, message.story.created));
            } else {
                dispatch(createOrUpdateItem('put', item, message.story.updated));
            }
        }
    },
    getStories: (value = '') => {
        return async (dispatch) => {
            try {
                const response = await axios.get(STORY_URL + '?filter=' + value);
                await dispatch({ type: Types.GET_STORIES, stories: response.data });
            } catch (error) {
                sendAlert(error.response);
                throw (error);
            }
        }
    },
    getStory: (id = '') => {
        return async (dispatch) => {
            try {
                if (id !== '') {
                    const response = await axios.get(STORY_URL + id);
                    await dispatch({ type: Types.GET_STORY, story: response.data });
                }
            } catch (error) {
                sendAlert(error.response);
                throw (error);
            }
        }
    },
    deleteStory: (id) => {
        return async (dispatch) => {
            try {
                if (id !== '') {
                    await axios.delete(STORY_URL + id);
                    await dispatch(Creators.notifyAction(message.story.deleted));
                }
            } catch (error) {
                sendAlert(error.response);
                throw (error);
            }
        }
    }

});

export default createReducer(INITIAL_STATE, {
    [Types.GET_STORY]: getStory,
    [Types.GET_UTTERS]: getUtters,
    [Types.GET_STORIES]: getStories,
    [Types.GET_INTENTS]: getIntents,
    [Types.ADD_TO_STORY]: addToStory,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.DELETE_CONTENT]: deleteContent,
    [Types.REORDER_CONTENT]: reorderContent,
    [Types.CREATE_NEW_STORY]: createNewStory,
    [Types.UNDO_DELETE_CONTENT]: undoDeleteContent,
    [Types.NOTIFY_CONTENT_TEXT_VALIDATION]: notifyContentTextValidation,
});
