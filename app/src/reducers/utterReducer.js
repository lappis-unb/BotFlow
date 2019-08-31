import { Utter } from '../utils/utter';

const INITIAL_STATE = {
    items: [],
    helper_text: "",
    filtered_utters: [],
    old_utter_texts: [],
    current_item: new Utter(),
    old_item: new Utter(),
    notification_text: "",
    have_alternatives: false,
    selected_item_position: -1
};

export default (state = INITIAL_STATE, action) => {

    function createObjectCopyOf(item) {
        if (item !== undefined) {
            return { ...item, utters: createArrayCopyOf(item.utters) }
        }
        return { ...item }
    }

    function createArrayCopyOf(items) {
        if (items !== undefined) {
            return items.map((utter) => {
                return {
                    ...utter,
                    utterText: utter.utterText.map((utter_text) => {
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

        case "SET_ITEM_NAME":
            return {
                ...state,
                current_item: {
                    ...(createObjectCopyOf(state.current_item)),
                    nameUtter: action.item_name
                }
            };

        case "SET_UTTER_TEXT":
            let new_current_item = createObjectCopyOf(state.current_item);
            new_current_item.utters[action.utter_position].utterText[action.text_position].text = action.text

            return {
                ...state,
                current_item: new_current_item
            };

        case "ADD_UTTER_TEXT":
            let new_utter = createObjectCopyOf(state.current_item);

            if (state.have_alternatives) {
                new_utter.utters.push(action.text);
            } else {
                new_utter.utters[0].utterText.push(action.text.utterText[0]);
            }

            return {
                ...state,
                current_item: new_utter
            };

        case "REMOVE_UTTER_TEXT":
            let current_item = createObjectCopyOf(state.current_item)
            let old_item_history = createObjectCopyOf(state.current_item)

            if (state.have_alternatives && current_item.utters.length > 1) {
                current_item.utters.splice(action.utter_position, 1);
            } else if (!state.have_alternatives && current_item.utters[0].utterText.length > 1) {
                current_item.utters[0].utterText.splice(action.text_position, 1);
            }

            return {
                ...state,
                current_item: current_item,
                old_utter_texts: old_item_history.utters
            };

        case 'UNDO_UTTER_TEXT_REMOVAL':
            return {
                ...state,
                current_item: {
                    ...state.current_item,
                    utters: createArrayCopyOf(state.old_utter_texts)
                }
            }

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
                filtered_items: action.items
            };

        case "SELECT_ITEM": {
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.nameUtter === action.item.nameUtter);
            });

            let new_item = [];
            let have_alternatives = false;

            if (selected_item !== undefined) {
                if (selected_item.utters.length > 1) {
                    have_alternatives = true;
                }
                new_item = createObjectCopyOf(selected_item).utters;
            } else {
                selected_item_position = 0;
            }

            selected_item = (selected_item !== undefined) ? createObjectCopyOf(selected_item) : createObjectCopyOf(state.current_item);

            let old_item = {}
            if (new_item.length !== 0) {
                old_item = { ...(createObjectCopyOf(selected_item)), utters: new_item }
            } else {
                old_item = createObjectCopyOf(selected_item);
            }


            return {
                ...state,
                helper_text: "",
                old_item: old_item,
                current_item: selected_item,
                have_alternatives: have_alternatives,
                selected_item_position: selected_item_position
            };
        }

        case "SAVE_DATA":
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_item: createObjectCopyOf(state.current_item)
            }

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_item: {
                    ...createObjectCopyOf(state.current_item),
                    utters: createArrayCopyOf(action.utters)
                }
            }
        }

        case "SET_HELPER_TEXT": {
            return {
                ...state,
                helper_text: action.helper_text
            }
        }

        default:
            return state;
    }
};
