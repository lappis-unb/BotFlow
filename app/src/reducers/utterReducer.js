import { Utter } from '../utils/DataFormat';

const INITIAL_STATE = {
    items: [],
    id_item: "",
    old_item: {},
    current_item: {},
    item_contents: [],
    old_item_contents: [],
    name_item: "",
    old_name_item: "",
    have_alternatives: false,
    notification_text: "",
    selected_item_position: -1
};

export default (state = INITIAL_STATE, action) => {
    function createObjectCopyOf(item) {
        if (item !== undefined) {
            return { ...item, alternatives: createArrayCopyOf(item.alternatives) }
        }
        return { ...item }
    }

    function createArrayCopyOf(items) {
        if (items !== undefined) {
            return items.map((utter) => {
                return {
                    ...utter,
                    contents: utter.contents.map((utter_text) => {
                        return { ...utter_text }
                    })
                }
            })
        }
        return items;
    }

    switch (action.type) {
        case "CREATE_NEW_ITEM": {
            console.log(action.new_item)
            return {
                ...state,
                id_item: "",
                name_item: action.new_item.name,
                item_contents: action.new_item.alternatives,
                old_name_item: action.new_item.name,
                old_item_contents: action.new_item.alternatives,
                have_alternatives: action.new_item.have_alternatives,
                selected_item_position: action.selected_item_position
            }
        }

        case "SET_NAME_ITEM": {
            return {
                ...state,
                name_item: action.name_item
            };
        }

        case "SUCESS_ACTION_UTTER": {
            let old_item = createObjectCopyOf(state.current_item)

            return {
                ...state,
                old_item: old_item,
                notification_text: action.text
            };
        }

        case "GET_ITEMS": {
            return {
                ...state,
                items: action.items,
            };
        }

        case "SELECT_ITEM": {
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.name === action.item.name);
            });

            let new_item_contents = createArrayCopyOf(selected_item.alternatives);
            let old_item_contents = createArrayCopyOf(selected_item.alternatives);

            return {
                ...state,
                name_item: selected_item.name,
                id_item: selected_item.id,
                item_contents: new_item_contents,
                old_name_item: selected_item.name,
                old_item_contents: old_item_contents,
                selected_item_position: selected_item_position,
                have_alternatives: selected_item.have_alternatives
            };
        }

        case "SAVE_DATA": {
            return {
                ...state,
                current_item: createObjectCopyOf(state.current_item)
            }
        }

        // UTTER 

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                item_contents: createArrayCopyOf(action.item_contents)
            }
        }

        case "SET_UTTER_CONTENT": {
            let item_contents = createArrayCopyOf(state.item_contents);
            item_contents[action.utter_position].contents[action.text_position].text = action.text

            return {
                ...state,
                item_contents: item_contents
            };
        }

        case "ADD_UTTER_CONTENT": {
            let new_utter = createArrayCopyOf(state.item_contents);

            if (state.have_alternatives) {
                new_utter.push(action.text);
            } else {
                new_utter[0].contents.push(action.text.contents[0]);
            }

            return {
                ...state,
                item_contents: new_utter
            };
        }

        case "REMOVE_UTTER_CONTENT": {
            let current_item_contents = createArrayCopyOf(state.item_contents)
            let old_item_history = createArrayCopyOf(state.item_contents)

            if (state.have_alternatives) {
                current_item_contents.splice(action.item_position, 1);
            } else if (current_item_contents[0].contents.length > 1) {
                current_item_contents[0].contents.splice(action.text_position, 1);
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
