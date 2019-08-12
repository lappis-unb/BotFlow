export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_UTTER":
            return { ...state, current_utter: action.new_utter }

        case "FILTER_UTTERS":
            let filtered_utters = [...state.utters];
            filtered_utters = filtered_utters.filter((utter) => utter.nameUtter.includes(action.value));

            return {
                ...state,
                filtered_utters: filtered_utters
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
            let new_utters = [...state.current_utter.utters];
            new_utters.push(action.text);

            return {
                ...state,
                old_utter_texts: [...state.current_utter.utters],
                current_utter: {
                    ...state.current_utter,
                    utters: [...new_utters]
                }
            };

        case "REMOVE_UTTER_TEXT":
            let utters_text = [...state.current_utter.utters];
            let old_utter_history = [...utters_text];

            if (utters_text.length !== 1) {
                utters_text.splice(action.text_position, 1);
            }

            return {
                ...state,
                old_utter_texts: old_utter_history,
                current_utter: {
                    ...state.current_utter,
                    utters: utters_text
                }
            };

        case 'UNDO_TEXT_REMOTION':
            return {
                ...state,
                current_utter: {
                    ...state.current_utter,
                    utters: [...state.old_utter_texts]
                }
            }

        case "SUCESS_ACTION_UTTER":
            return { ...state, text: action.text };

        case "GET_UTTERS":
            return { ...state, utters: [...action.utters], filtered_utters: [...action.utters] };

        case "SELECT_UTTER":
            return {
                ...state,
                current_utter: state.utters.find((utter) => utter._id === action.utter_id)
            };

        default:
            return state;
    }
};
