import { Utter } from '../utils/utter';

const INITIAL_STATE = {
    utters: [],
    helper_text: "",
    filtered_utters: [],
    old_utter_texts: [],
    current_utter: new Utter(),
    old_utter: new Utter(),
    notification_text: "",
    have_alternatives: false,
    selected_item_position: -1
};


export default (state = INITIAL_STATE, action) => {

    function createObjectCopyOf(item) {
        if (item.utters !== undefined) {
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
        case "CREATE_NEW_UTTER":
            return {
                ...state,
                current_utter: createObjectCopyOf(action.new_utter),
                old_utter: createObjectCopyOf(action.new_utter),
                selected_item_position: action.selected_item_position
            }

        case "SET_UTTER_NAME":
            return {
                ...state,
                current_utter: {
                    ...(createObjectCopyOf(state.current_utter)),
                    nameUtter: action.utter_name
                }
            };

        case "SET_UTTER_TEXT":
            let new_current_utter = createObjectCopyOf(state.current_utter);
            new_current_utter.utters[action.utter_position].utterText[action.text_position].text = action.text

            return {
                ...state,
                current_utter: new_current_utter
            };

        case "ADD_UTTER_TEXT":
            let new_utter = createObjectCopyOf(state.current_utter);

            if (state.have_alternatives) {
                new_utter.utters.push(action.text);
            } else {
                new_utter.utters[0].utterText.push(action.text.utterText[0]);
            }

            return {
                ...state,
                current_utter: new_utter
            };

        case "REMOVE_UTTER_TEXT":
            let current_utter = createObjectCopyOf(state.current_utter)
            let old_utter_history = createObjectCopyOf(state.current_utter)

            if (state.have_alternatives && current_utter.utters.length > 1) {
                current_utter.utters.splice(action.utter_position, 1);
            } else if (!state.have_alternatives && current_utter.utters[0].utterText.length > 1) {
                current_utter.utters[0].utterText.splice(action.text_position, 1);
            }

            return {
                ...state,
                current_utter: current_utter,
                old_utter_texts: old_utter_history.utters
            };

        case 'UNDO_UTTER_TEXT_REMOVAL':
            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: createArrayCopyOf(state.old_utter_texts)
                }
            }

        case "SUCESS_ACTION_UTTER": {
            let old_utter = createObjectCopyOf(state.current_utter)

            return {
                ...state,
                old_utter: old_utter,
                notification_text: action.text
            };
        }

        case "GET_UTTERS":
            return {
                ...state,
                utters: action.utters.map(el => el),
                filtered_utters: action.utters.map(el => el)
            };

        case "SELECT_ITEM": {
            let selected_item_position = 0;

            let selected_item = action.items.find((item, index) => {
                selected_item_position = index;
                return (item._id === action.item._id || item.nameUtter === action.item.nameUtter);
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

            selected_item = (selected_item !== undefined) ? createObjectCopyOf(selected_item) : createObjectCopyOf(state.current_utter);

            let old_utter = {}
            if (new_item.length !== 0) {
                old_utter = { ...(createObjectCopyOf(selected_item)), utters: new_item }
            } else {
                old_utter = createObjectCopyOf(selected_item);
            }


            return {
                ...state,
                helper_text: "",
                old_utter: old_utter,
                current_utter: selected_item,
                have_alternatives: have_alternatives,
                selected_item_position: selected_item_position
            };
        }

        case "SAVE_DATA":
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_utter: createObjectCopyOf(state.current_utter)
            }

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_utter: {
                    ...createObjectCopyOf(state.current_utter),
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
