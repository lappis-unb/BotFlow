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
                    "type": "intent"
                },
                {
                    "id": 2,
                    "type": "utter"
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
                "type": "intent"
            },
            {
                "id": 2,
                "type": "utter"
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
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.intents.id || item.name === action.intents.name);
            });

            return {
                ...state,
                name_item: selected_item.name,
                id_item: selected_item.id,
                old_name_item: selected_item.name,
                selected_item_position: selected_item_position,
                multiple_alternatives: selected_item.multiple_alternatives,
                item_contents: createArrayCopyOf(selected_item.alternatives),
                old_item_contents: createArrayCopyOf(selected_item.alternatives)
            };
        }

        default:
            return state;
    }
};
