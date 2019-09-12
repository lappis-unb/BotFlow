const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {

    function createArrayCopyOf(samples = [""]) {
        if (samples.length !== 0) {
            return samples.map(text => text);
        }
        return samples;
    }
    
    switch (action.type) {
        

        case "SUCESS_ACTION_ITEM": {
            // ACHO que não precisa atualizar o estado do item_contents
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

        default:
            return state;
    }
};
