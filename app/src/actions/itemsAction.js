import axios from "axios";

export const getItems = (url, operation = '', item = undefined) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(url);
            const items = await sortItemName(response.data, 'nameUtter');

            await dispatch({ type: "GET_ITEMS", items: items });

            if (operation === 'delete' && item !== undefined) {
                await dispatch(createNewItem(item));
            } else if (operation === 'create_update' && item !== undefined) {
                await dispatch(selectItem(item, 0, items));
            }
        } catch (error) {
            throw (error);
        }
    }
};

// TODO REMOVE THIS - IMPLEMENT IN API
const sortItemName = (utters) => {
    // Sorts alphabetically utters in sidebar
    utters.sort(function (a, b) {
        if (a['nameUtter'] < b['nameUtter']) { return -1; }
        if (a['nameUtter'] > b['nameUtter']) { return 1; }
        return 0;
    })

    return utters;
}

export const createOrUpdateItem = (mode = 'post', url = "", new_item, message = "") => {
    return async (dispatch) => {
        try {
            await axios[mode](url, new_item);
            await dispatch(getItems(url, 'create_update', new_item));
            dispatch(notifyAction(message));
        } catch (error) {
            throw (error);
        }
    }
};

export const saveData = (item, items, create_get_url, update_url, mode = "Utter") => {
    return async (dispatch) => {

        if ((item._id === undefined)) {
            await dispatch(createOrUpdateItem('post', create_get_url, item, mode + " criada com sucesso!"));
        } else if (item._id !== undefined) {
            dispatch(createOrUpdateItem('put', (update_url + item._id), item, mode + " atualizada com sucesso!"));
        }
    }
}

export const deleteItem = (url = "", get_url, mode, item) => {
    return async (dispatch) => {
        try {
            await axios.delete(url);
            await dispatch(getItems(get_url, 'delete', item));
            dispatch(notifyAction(mode + "  removida com sucesso!"));
        } catch (error) {
            throw (error);
        }
    }
};

export const notifyAction = (text) => {
    return {
        type: "SUCESS_ACTION_UTTER",
        text: text
    };
};

export const selectItem = (item, index = -1, items = []) => {
    return {
        type: "SELECT_ITEM",
        item: item,
        items: items,
        selected_item_position: index
    };
}

export const setItemName = (item_name = "") => {
    return {
        type: "SET_ITEM_NAME",
        item_name: item_name
    };
}

export const createNewItem = (item) => {
    return {
        type: "CREATE_NEW_ITEM",
        new_item: item,
        selected_item_position: -1
    };
}

export const setHelperText = (helper_text) => {
    return {
        type: "SET_HELPER_TEXT",
        helper_text: helper_text
    }
}