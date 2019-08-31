import { Intent } from '../utils/DataFormat';

const INITIAL_STATE = {
    helper_text: "",
    intents: [],
    filtered_intents: [],
    old_intents_texts: [],
    current_intent: new Intent(),
    old_intent: new Intent(),
    intent_submit_button_enable: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CREATE_NEW_INTENT":
            return { ...state, current_intent: { ...action.new_intent }, old_intent: { ...action.new_intent } }

        case "SET_INTENT_NAME":
            return {
                ...state,
                helper_text: action.helper_text,
                current_intent: {
                    ...state.current_intent,
                    nameIntent: action.intent_name
                }
            };

        case "SET_INTENT_TEXT":
            let new_intents_text = [...state.current_intent.intent];
            new_intents_text[action.position].text = action.text

            return {
                ...state,
                current_intent: {
                    ...state.current_intent,
                    intent: [...new_intents_text]
                }
            };

        case "ADD_INTENT_TEXT":
            let new_intents = [...state.current_intent.intent];
            new_intents.push(action.text);

            return {
                ...state,
                old_intent_texts: [...state.current_intent.intent],
                current_intent: {
                    ...state.current_intent,
                    intent: [...new_intents]
                }
            };

        case "REMOVE_INTENT_TEXT":
            let intents_text = [...state.current_intent.intent];
            let old_intent_history = [...intents_text];

            if (intents_text.length !== 1) {
                intents_text.splice(action.text_position, 1);
            }

            return {
                ...state,
                old_intent_texts: old_intent_history,
                current_intent: {
                    ...state.current_intent,
                    intent: intents_text
                }
            };

        case 'UNDO_INTENT_TEXT_REMOVAL':
            return {
                ...state,
                current_intent: {
                    ...state.current_intent,
                    intent: [...state.old_intent_texts]
                }
            }

        case "SUCESS_ACTION_INTENT":
            return { ...state, text: action.text };

        case "GET_INTENTS":
            return { ...state, intents: [...action.intents], filtered_intents: [...action.intents] };

        case "SELECT_INTENT": {
            let intent_selected = state.intents.find((intent) => intent._id === action.intent_id);
            console.log('reducer errado');


            let intents_text = [...intent_selected.intent.map((intent) => {
                return {
                    ...intent,
                    text: intent.text
                }
            }
            )]

            return {
                ...state,
                intent_submit_button_enable: false,
                current_intent: { ...intent_selected },
                old_intent: { ...intent_selected, intents: intents_text }
            };
        }

        case "IS_ENABLE_BUTTON_INTENT": {
            let is_text_changed = (JSON.stringify(state.current_intent) !== JSON.stringify(state.old_intent));

            return {
                ...state,
                intent_submit_button_enable: (action.intent_submit_button && is_text_changed)
            }
        }

        case "SAVE_DATA":
            return {
                ...state,
                helper_text: action.helper_text
            }

        case "CHANGE_INTENT_FORM":
            return {
                ...state,
                current_intent: {
                    ...state.current_intent,
                    intent: action.intents
                }
            }

        default:
            return state;
    }
};
