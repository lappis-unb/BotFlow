import { Story } from '../utils/DataFormat.js'
import { INTENT_URL, UTTER_URL } from '../utils/url_routes.js';
import axios from "axios";


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
