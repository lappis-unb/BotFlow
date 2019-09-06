const INITIAL_STATE = {
    intents: [],
    utters: [],
    selected_intent_position: -1,
    selected_utter_position: -1
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case "GET_INTENTS":{
            return{
                ...state,
                intents: action.intents
            }
        }

        case "GET_UTTERS":{
            return{
                ...state,
                utters: action.utters
            }
        }

        default:
            return state;
    }
};
