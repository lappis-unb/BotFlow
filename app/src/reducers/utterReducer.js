import { Utter } from '../utils/DataFormat';

const INITIAL_STATE = {
    items: [],
    old_item: {},
    current_item: {},
    old_utter_texts: [],
    item_name: "",
    have_alternatives: false,
    item_content: [],
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
        case "CREATE_NEW_ITEM":
            return {
                ...state,
                current_item: createObjectCopyOf(action.new_item),
                old_item: createObjectCopyOf(action.new_item),
                selected_item_position: action.selected_item_position
            }

        case "SET_NAME_ITEM":
            return {
                ...state,
                item_name: action.item_name
            };

        case "SUCESS_ACTION_UTTER": {
            let old_item = createObjectCopyOf(state.current_item)

            return {
                ...state,
                old_item: old_item,
                notification_text: action.text
            };
        }

        case "GET_ITEMS":
            return {
                ...state,
                items: action.items,
            };

        case "SELECT_ITEM": {
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.name === action.item.name);
            });

            let new_item = [];

            if (selected_item !== undefined) {
                new_item = createObjectCopyOf(selected_item).alternatives;
            } else {
                selected_item_position = 0;
            }

            selected_item = (selected_item !== undefined) ? createObjectCopyOf(selected_item) : createObjectCopyOf(state.current_item);

            let old_item = {}
            if (new_item.length !== 0) {
                old_item = { ...(createObjectCopyOf(selected_item)), alternatives: new_item }
            } else {
                old_item = createObjectCopyOf(selected_item);
            }


            return {
                ...state,
                old_item: old_item,
                current_item: selected_item,
                item_name: selected_item.name,
                have_alternatives: selected_item.have_alternatives,
                selected_item_position: selected_item_position
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
            let new_current_item = createObjectCopyOf(state.current_item);

            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_item: {
                    ...new_current_item,
                    alternatives: createArrayCopyOf(action.alternatives)
                }
            }
        }

        case "SET_UTTER_CONTENT":
            let new_current_item = createObjectCopyOf(state.current_item);
            new_current_item.alternatives[action.utter_position].contents[action.text_position].text = action.text

            return {
                ...state,
                current_item: new_current_item
            };

        case "ADD_UTTER_CONTENT":
            let new_utter = createObjectCopyOf(state.current_item);

            if (new_utter.have_alternatives) {
                new_utter.alternatives.push(action.text);
            } else {
                new_utter.alternatives[0].contents.push(action.text.contents[0]);
            }

            return {
                ...state,
                current_item: new_utter
            };

        case "REMOVE_UTTER_CONTENT":
            let current_item = createObjectCopyOf(state.current_item)
            let old_item_history = createObjectCopyOf(state.current_item)

            if (current_item.have_alternatives) {
                current_item.alternatives.splice(action.utter_position, 1);
            } else if (current_item.alternatives[0].contents.length > 1) {
                current_item.alternatives[0].contents.splice(action.text_position, 1);
            }

            return {
                ...state,
                current_item: current_item,
                old_utter_texts: old_item_history.alternatives
            };

        case 'UNDO_UTTER_CONTENT_REMOVAL':
            return {
                ...state,
                current_item: {
                    ...state.current_item,
                    alternatives: createArrayCopyOf(state.old_utter_texts)
                }
            }

        default:
            return state;
    }
};
