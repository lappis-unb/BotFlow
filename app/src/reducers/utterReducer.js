import { Utter } from '../utils/utter';

const INITIAL_STATE = {
    utters: [],
    helper_text: "",
    filtered_utters: [],
    old_utter_texts: [],
    current_utter: new Utter(),
    old_utter: new Utter(),
    notification_text: "",
    alternatives: false,
    selected_item: -1
};

export default (state = INITIAL_STATE, action) => {
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

            if (state.alternatives) {
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

            if ((state.alternatives) && utters_text.length > 1) {
                utters_text.splice(action.utter_position, 1);
            } else if (!state.alternatives && utters_text[0].utterText.length > 1) {
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

        case "SELECT_UTTER": {
            let selected_item = 0;
            let utter_selected = state.utters.find((item, index) => {
                selected_item = index;
                return (item._id === action.item._id || item.nameUtter === action.item.nameUtter);
            });

            let alternatives = false;
            let utters_text = [];

            if (utter_selected !== undefined) {
                if (utter_selected.utters.length > 1) {
                    alternatives = true;
                }

                utters_text = [...utter_selected.utters.map((utter) => {
                    return {
                        ...utter,
                        utterText: utter.utterText.map((utter_text) => {
                            return { ...utter_text }
                        })
                    }
                })]
            } else {
                selected_item = 0;
            }

            utter_selected = (utter_selected !== undefined) ? { ...utter_selected } : { ...state.current_utter };
            let old_utter = (utters_text.length !== 0) ? { ...utter_selected, utters: utters_text } : { ...utter_selected };

            return {
                ...state,
                helper_text: "",
                alternatives: alternatives,
                old_utter: { ...old_utter },
                selected_item: (selected_item),
                current_utter: { ...utter_selected }
            };
        }

        case "SAVE_DATA":
            return {
                ...state,
                alternatives: action.alternatives,
                current_utter: {
                    ...state.current_utter,
                    utters: action.utters,
                }
            }

        case "CHANGE_UTTER_FORM": {
            return {
                ...state,
                alternatives: action.alternatives,
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
