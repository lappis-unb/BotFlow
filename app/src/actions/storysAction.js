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