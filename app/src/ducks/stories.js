
import axios from "axios";
import { createActions, createReducer } from 'reduxsauce'
import { INTENT_URL, UTTER_URL, STORY_URL } from '../utils/url_routes.js';
import { message } from '../utils/messages';

const INITIAL_STATE = {
    utters: [],
    intents: [],
    stories: [],
    content: [],
    name: "",
    old_content: [],
    story_id: "",
    notification_text: "",
    content_text_validation: ""
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

export const getStories = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        stories: action.stories,
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
        if (content[i - 1].type === 'intent' && content[i].type === 'intent') {
            intent_intent = false;
        }
    }

    if (!intent_intent) {
        return message.story.two_intents;
    } else if (content.length !== 0 && content[0].type !== 'intent') {
        return message.story.first_element;
    }

    return "";

}

export const reorderContent = (state = INITIAL_STATE, action) => {
    const result = createArrayObjCopyOf(state.content);
    const [removed] = result.splice(action.start_index, 1);
    result.splice(action.end_index, 0, removed);

    const text = validationContent(result);

    return {
        ...state,
        content: result,
        content_text_validation: text
    }
}

export const deleteContent = (state = INITIAL_STATE, action) => {
    let new_content = createArrayObjCopyOf(state.content);
    new_content.splice(action.content_position, 1);

    const text = validationContent(new_content);

    return {
        ...state,
        content: new_content,
        content_text_validation: text
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
        content_text_validation: text
    }
}

export const { Types, Creators } = createActions({
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
                dispatch(createOrUpdateItem('post', item, message.story.created));
            } else {
                dispatch(createOrUpdateItem('put', item, message.story.updated));
            }
        }
    },
    getStories: () => {
        return async (dispatch) => {
            try {
                const response = await axios.get(STORY_URL);
                await dispatch({ type: Types.GET_STORIES, stories: response.data });
            } catch (error) {
                throw (error);
            }
        }
    },
    getStory: (id) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(STORY_URL + id);
                await dispatch({ type: Types.GET_STORY, story: response.data });
            } catch (error) {
                throw (error);
            }
        }
    },
    deleteStory: (story_id) => {
        return async (dispatch) => {
            try {
                await axios.delete(STORY_URL + story_id);
                await dispatch(Creators.getIntents());
                await dispatch(Creators.notifyAction(message.story.deleted));
                
                // Create new_story

                //await dispatch(Creators.createNewStory())

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
    [Types.GET_STORIES]: getStories,
    [Types.GET_STORY]: getStory,
    [Types.GET_INTENTS]: getIntents,
    [Types.ADD_TO_STORY]: addToStory,
    [Types.DELETE_CONTENT]: deleteContent,
    [Types.NOTIFY_ACTION]: notifyAction,
    [Types.REORDER_CONTENT]: reorderContent,
    [Types.NOTIFY_CONTENT_TEXT_VALIDATION]: notifyContentTextValidation,
});
