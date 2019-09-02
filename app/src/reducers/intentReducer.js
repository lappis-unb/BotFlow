const INITIAL_STATE = {
    items: [],
    id_item: "",
    old_item: {},
    item_contents: [],
    old_item_contents: [],
    name_item: "",
    old_name_item: "",
    notification_text: "",
    selected_item_position: -1
};

export default (state = INITIAL_STATE, action) => {

    //function createObjectCopyOf(item) {
    //    if (item !== undefined) {
    //        return { ...item, alternatives: createArrayCopyOf(item.alternatives) }
    //    }
    //    return { ...item }
    //}

    function createArrayCopyOf(questions = []) {
        if (questions.length !== 0) {
            return questions.map(question_text => {
                return { ...question_text }
            })
        }
        return questions;
    }

    switch (action.type) {
        case "CREATE_NEW_ITEM": {
            return {
                ...state,
                id_item: "",
                name_item: action.new_item.name,
                old_name_item: action.new_item.name,
                item_contents: action.new_item.questions,
                old_item_contents: action.new_item.questions,
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
                items: action.items,
            };
        }

        case "SELECT_ITEM": {
            let selected_item_position = 0;

            let selected_item = state.items.find((item, index) => {
                selected_item_position = index;
                return (item.id === action.item.id || item.name === action.item.name);
            });

            return {
                ...state,
                name_item: selected_item.name,
                id_item: selected_item.id,
                old_name_item: selected_item.name,
                selected_item_position: selected_item_position,
                item_contents: createArrayCopyOf(selected_item.questions),
                old_item_contents: createArrayCopyOf(selected_item.questions)
            };
        }

        // INTENT

        case "SET_INTENT_TEXT": {
            let item_contents = createArrayCopyOf(state.item_contents);
            item_contents[action.intent_position].text = action.text

            return {
                ...state,
                item_contents: item_contents
            };
        }

        case "ADD_INTENT_TEXT": {
            let new_intent = createArrayCopyOf(state.item_contents);

            new_intent.push(action.text);

            return {
                ...state,
                item_contents: new_intent,
                old_item_contents: createArrayCopyOf(new_intent)
            };
        }

        case "REMOVE_INTENT_TEXT": {
            let current_item_contents = createArrayCopyOf(state.item_contents)
            let old_item_history = createArrayCopyOf(state.item_contents)

            current_item_contents.splice(action.intent_position, 1);
            
            return {
                ...state,
                item_contents: current_item_contents,
                old_item_contents: old_item_history
            };
        }

        case 'UNDO_INTENT_TEXT_REMOVAL': {
            return {
                ...state,
                item_contents: createArrayCopyOf(state.old_item_contents)
            }
        }

        default:
            return state;
    }
};
