
import { Story } from '../utils/DataFormat.js'
import { INTENT_URL, UTTER_URL } from '../utils/url_routes.js';
import axios from "axios";

const INITIAL_STATE = {
    intents: [],
    utters: [],
    selected_intent_position: -1,
    selected_utter_position: -1,
    id_item: "",
    old_item: {},
    items: [],
    item_contents: [
        {
            "name": "intent",
            "type": "intent"
        },
        {
            "name": "utter",
            "type": "utter"
        }
    ],
    old_item_contents: [],
    name_item: "",
    old_name_item: "",
    notification_text: "",
    selected_item_position: -1,
    story_example: [
        { text: "example", type: "utter" },
        { text: "example", type: "intent" },
        { text: "example", type: "utter" },
        { text: "example", type: "intent" },
        { text: "example", type: "utter" },
        { text: "example", type: "intent" },
        { text: "example", type: "utter" }
    ]
};

export default (state = INITIAL_STATE, action) => {

    function createArrayCopyOf(samples = [""]) {
        if (samples.length !== 0) {
            return samples.map(text => text);
        }
        return samples;
    }
    function createArrayObjCopyOf(samples = [""]) {
        if (samples.length !== 0) {
            return samples.map(text => { return { ...text } });
        }
        return samples;
    }

    switch (action.type) {

        case "GET_INTENTS": {
            return {
                ...state,
                intents: action.intents,
            }
        }

        case "GET_UTTERS": {
            return {
                ...state,
                utters: action.utters,
            }
        }

        case "SELECT_ITEM": {
            return {
                ...state
            };
        }

        case "REORDER": {
            return {
                ...state,
                item_contents: createArrayObjCopyOf(action.items)
            }
        }

        case "ADD_TO_STORY": {
            let new_item_contents = createArrayObjCopyOf(state.item_contents);
            new_item_contents.push(action.item);
            return {
                ...state,
                item_contents: new_item_contents
            }
        }

        case "REMOVE_ITEM": {
            let new_item_contents = createArrayObjCopyOf(state.item_contents);
            new_item_contents.splice(action.item_position, 1);

            return {
                ...state,
                item_contents: new_item_contents
            }
        }

        default: {
            return state;
        }
    }
};

export const getIntents = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(INTENT_URL);
            await dispatch({ type: "GET_INTENTS", intents: response.data });
        } catch (error) {
            throw (error);
        }
    }
};

export const getUtters = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(UTTER_URL);
            await dispatch({ type: "GET_UTTERS", utters: response.data });
        } catch (error) {
            throw (error);
        }
    }
};

export const reorderList = (arr) =>{

    return {
        type: "REORDER",
        items: arr
    }
    
}

export const addToStory = (item) => {

    return {
        type: "ADD_TO_STORY",
        item: item
    }
}

export const removeItem = (item_position) => {
    return {
        type: "REMOVE_ITEM",
        item_position: item_position
    }
}


export const createOrUpdateItem = (mode = 'post', url = "", new_item, message = "") => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? url : url + new_item.id;

            await axios[mode](mode_url, new_item);
            dispatch(notifyAction(message));

        } catch (error) {
            throw (error);
        }
    }
};

export const saveData = (url, item) => {
    console.log("SAASDAS", item)
    return async (dispatch) => {
        if ((item.id === "" || item.id===undefined)) {
            dispatch(createOrUpdateItem('post', url, item, "Story criada com sucesso!"));
        } else {
            dispatch(createOrUpdateItem('put', url, item, "Story atualizada com sucesso!"));
        }
    }
}


export const notifyAction = (text) => {
    return {
        type: "SUCESS_ACTION_ITEM",
        text: text
    };
};
