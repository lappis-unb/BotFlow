import axios from "axios";

export const getItems = (url) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(url);
            await dispatch({ type: "GET_ITEMS", items: response.data });
        } catch (error) {
            throw (error);
        }
    }
};

export const createOrUpdateItem = (mode = 'post', url = "", new_item, message = "") => {
    return async (dispatch) => {
        try {
            const mode_url = (mode === 'post') ? url : url + new_item.id;

            await axios[mode](mode_url, new_item);
            await dispatch(getItems(url));
            dispatch(notifyAction(message));

            if (new_item !== undefined) {
                dispatch(selectItem(new_item, 0));
            }
        } catch (error) {
            throw (error);
        }
    }
};

export const saveData = (url, mode = "Utter", item) => {
    return async (dispatch) => {
        if ((item.id === "" || item.id===undefined)) {
            dispatch(createOrUpdateItem('post', url, item, mode + " criada com sucesso!"));
        } else {
            dispatch(createOrUpdateItem('put', url, item, mode + " atualizada com sucesso!"));
        }
    }
}

export const deleteItem = (url = "", delete_item_id, mode, item) => {
    return async (dispatch) => {
        try {
            await axios.delete(url + delete_item_id);
            await dispatch(getItems(url));
            dispatch(notifyAction(mode + "  removida com sucesso!"));

            if (item !== undefined) {
                await dispatch(createNewItem(item))
            }
        } catch (error) {
            throw (error);
        }
    }
};

export const notifyAction = (text) => {
    return {
        type: "SUCESS_ACTION_ITEM",
        text: text
    };
};

export const selectItem = (item) => {
    return {
        type: "SELECT_ITEM",
        item: item
    };
}

export const setNameItem = (name_item = "") => {
    return {
        type: "SET_NAME_ITEM",
        name_item: name_item
    };
}

export const createNewItem = (item) => {
    return {
        type: "CREATE_NEW_ITEM",
        new_item: item,
        selected_item_position: -1
    };
}
