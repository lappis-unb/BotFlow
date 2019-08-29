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

    function createCopyOf(item) {
        let new_alternatives;
        if (item.utters !== undefined) {
            new_alternatives = (
                item.utters.map((utter) => {
                    return {
                        ...utter,
                        utterText: utter.utterText.map((utter_text) => {
                            return { ...utter_text }
                        })
                    }
                })
            )
            return { ...item, utters: new_alternatives }
        }
        return { ...item };
    }

    switch (action.type) {
        case "CREATE_NEW_UTTER":
            return {
                ...state,
                current_utter: { ...action.new_utter },
                old_utter: { ...action.new_utter },
                selected_item: action.selected_item
            }

        case "SET_UTTER_NAME":
            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    nameUtter: action.utter_name
                }
            };

        case "SET_UTTER_TEXT":
            let new_utters_text = [...state.current_utter.utters];
            new_utters_text[action.utter_position].utterText[action.text_position].text = action.text

            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: [...new_utters_text]
                }
            };

        case "ADD_UTTER_TEXT":
            let new_utters = state.current_utter.utters.map(i => i);

            if (state.have_alternatives) {
                new_utters.push(action.text);
            } else {
                new_utters[0].utterText.push(action.text.utterText[0]);
            }

            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: new_utters.map(i => i)
                }
            };

        case "REMOVE_UTTER_TEXT":
            let utters_text = (state.current_utter.utters).map((utter) => {
                return {
                    ...utter,
                    utterText: utter.utterText.map((utter_text) => {
                        return { ...utter_text }
                    })
                }
            })

            let old_utter_history = (state.current_utter.utters).map((utter) => {
                return {
                    ...utter,
                    utterText: utter.utterText.map((utter_text) => {
                        return { ...utter_text }
                    })
                }
            })

            if ((state.have_alternatives) && utters_text.length > 1) {
                utters_text.splice(action.utter_position, 1);
            } else if (!state.have_alternatives && utters_text[0].utterText.length > 1) {
                utters_text[0].utterText.splice(action.text_position, 1);
            }

            return {
                ...state,
                old_utter_texts: old_utter_history.map(item => item),
                current_utter: {
                    ...state.current_utter,
                    utters: utters_text.map(item => item)
                }
            };

        case 'UNDO_UTTER_TEXT_REMOVAL':
            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: [...state.old_utter_texts]
                }
            }

        case "SUCESS_ACTION_UTTER": {
            let utters_text = [...state.current_utter.utters.map((utter) => {
                return {
                    ...utter,
                    utterText: utter.utterText.map((utter_text) => {
                        return { ...utter_text }
                    })
                }
            })]

            return {
                ...state,
                notification_text: action.text,
                old_utter: { ...state.current_utter, utters: utters_text }
            };
        }

        case "GET_UTTERS":
            return {
                ...state,
                utters: [...action.utters],
                filtered_utters: [...action.utters]
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
                new_item = createCopyOf(selected_item);
            } else {
                selected_item_position = 0;
            }

            selected_item = (selected_item !== undefined) ? createCopyOf(selected_item) : createCopyOf(state.current_utter);

            let old_utter = {}
            if (new_item.length !== 0) {
                old_utter = { ...(createCopyOf(selected_item)), utters: new_item }
            } else {
                old_utter = createCopyOf(selected_item);
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
                current_utter: {
                    ...state.current_utter,
                    utters: action.utters,
                }
            }

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                have_alternatives: action.have_alternatives,
                current_utter: {
                    ...state.current_utter,
                    utters: action.utters
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
