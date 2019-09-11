const INITIAL_STATE = {
    intents: [],
    utters: [],
    selected_intent_position: -1,
    selected_utter_position: -1,
    id_item: "",
    old_item: {},
    items: [
        {
            "id": 1,
            "name": "story_basica",
            "formatted_content": [
                {
                    "id": 1,
                    "type": "intent",
                    "name": "cumprimentar"
                },
                {
                    "id": 2,
                    "type": "utter",
                    "name": "utter_cumprimentar"
                }
            ]
        }
    ],
    current_item: {
        "id": 1,
        "name": "story_basica",
            "formatted_content": [
                {
                    "id": 1,
                    "type": "intent",
                    "name": "cumprimentar"
                },
                {
                    "id": 2,
                    "type": "utter",
                    "name": "utter_cumprimentar"
                }
            ]
    },
    item_contents: [],
    old_item_contents: [],
    name_item: "",
    old_name_item: "",
    notification_text: "",
    selected_item_position: -1
};

export default (state = INITIAL_STATE, action) => {

    function createArrayCopyOf(samples = [""]) {
        if (samples.length !== 0) {
            return samples.map(text => text);
        }
        return samples;
    }


    switch (action.type) {

        case "GET_INTENTS": {

            let selected_item_position = 0;

            let selected_item = state.intents.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.name === action.item.name);
            });

            return {
                ...state,
                intents: action.intents,
                selected_intents_position: selected_item_position
            }
        }

        case "GET_UTTERS": {

            let selected_item_position = 0;

            let selected_item = state.utters.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.utters.id || item.name === action.intents.name);
            });

            return {
                ...state,
                utters: action.utters,
                selected_utters_position: selected_item_position
            }
        }

        case "SELECT_ITEM": {
            return {
                ...state
            };
        }

        default:
            return state;
    }
};
