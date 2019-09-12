const INITIAL_STATE = {
    items: [],
    id_item: "",
    old_item: {},
    current_item: {},
    item_contents: [],
    old_item_contents: [],
    name_item: "",
    old_name_item: "",
    multiple_alternatives: false,
    notification_text: "",
    selected_item_position: -1
};

export default (state = INITIAL_STATE, action) => {

    function createArrayCopyOf(items) {
        console.log("Items", items)
        if (items !== undefined) {
            return items.map(utter => utter.map(text => text));
        }
        return items;
    }

    switch (action.type) {
        case "CREATE_NEW_ITEM": {
            return {
                ...state,
                id_item: "",
                name_item: action.new_item.name,
                old_name_item: action.new_item.name,
                item_contents: action.new_item.alternatives,
                old_item_contents: action.new_item.alternatives,
                multiple_alternatives: action.new_item.multiple_alternatives,
                selected_item_position: action.selected_item_position
            }
        }

        case "SET_NAME_ITEM": {
            return {
                ...state,
                name_item: action.name_item
            };
        }

        case "SUCESS_ACTION_ITEM": {
            let item_contents = createArrayCopyOf(state.item_contents);

            return {
                ...state,
                old_item: item_contents,
                notification_text: action.text
            };
        }

        case "GET_ITEMS": {
            return {
                ...state,
                items: action.items
            };
        }

        case "SELECT_ITEM": {
            console.log('em utter');
            let selected_item = action.item;
/*
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.name === action.item.name);
            });
*/
            return {
                ...state,
                name_item: selected_item.name,
                id_item: selected_item.id,
                old_name_item: selected_item.name,
                //selected_item_position: selected_item_position,
                multiple_alternatives: selected_item.multiple_alternatives,
                item_contents: createArrayCopyOf(selected_item.alternatives),
                old_item_contents: createArrayCopyOf(selected_item.alternatives)
            };
        }

        // UTTER 

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                multiple_alternatives: action.multiple_alternatives,
                item_contents: createArrayCopyOf(action.item_contents)
            }
        }

        case "SET_UTTER_CONTENT": {
            let item_contents = createArrayCopyOf(state.item_contents);
            item_contents[action.utter_position][action.text_position] = action.text

            return {
                ...state,
                item_contents: item_contents
            };
        }

        case "ADD_UTTER_CONTENT": {
            let new_utter = createArrayCopyOf(state.item_contents);

            if (state.multiple_alternatives) {
                new_utter.push(['']);
            } else {
                new_utter[0].push('');
            }

            return {
                ...state,
                item_contents: new_utter,
                old_item_contents: createArrayCopyOf(new_utter)
            };
        }

        case "REMOVE_UTTER_CONTENT": {
            let current_item_contents = createArrayCopyOf(state.item_contents)
            let old_item_history = createArrayCopyOf(state.item_contents)

            current_item_contents[action.item_position].splice(action.text_position, 1);
            if (current_item_contents[action.item_position].length === 0) {
                current_item_contents.splice(action.item_position, 1);
            }
           
            return {
                ...state,
                item_contents: current_item_contents,
                old_item_contents: old_item_history
            };
        }

        case 'UNDO_UTTER_CONTENT_REMOVAL': {
            return {
                ...state,
                item_contents: createArrayCopyOf(state.old_item_contents)
            }
        }

        default:
            return state;
    }
};
