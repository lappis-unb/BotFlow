import axios from "axios";
import { Intent } from '../utils/intent.js'

const BASE = "https://botflow.api.lappis.rocks/";
//const BASE = "http://localhost:3030/";

const INTENT_URL_API_GET_DELETE = BASE + "intent/";
const INTENT_URL_API_CREATE_UPDATE = BASE + "project/intent/";

export const getIntents = (operation = '', intent = undefined) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(INTENT_URL_API_CREATE_UPDATE);
      let intents = await sortIntentName(response.data);
      await dispatch({ type: "GET_INTENTS", intents: intents });
      if (operation === 'delete') {
        await dispatch(createNewUtter());
      } else if (operation === 'create_update') {
        await dispatch(selectItem(intent, 0, intents));
      }
    } catch (error) {
      throw (error);
    }
  }
};

// TODO REMOVE THIS - IMPLEMENT IN API
const sortIntentName = (intents) => {
  // sorts alphabetically intents in sidebar
  intents.sort(function (a, b) {
    if (a['nameIntent'] < b['nameIntent']) { return -1; }
    if (a['nameIntent'] > b['nameIntent']) { return 1; }
    return 0;
  })

  return intents;
}

export const createIntent = (new_intent = {}) => {
  let message = "Intent criada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.post(INTENT_URL_API_CREATE_UPDATE, new_intent);
      await dispatch(getIntents('create_update', new_intent));
      dispatch(notifyAction(message));
    } catch (error) {
      throw (error);
    }
  }
};

export const updateIntent = (new_intent = {}, intent_id) => {
  let url = INTENT_URL_API_GET_DELETE + intent_id;
  let message = "Intent atualizada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.put(url, new_intent);
      await dispatch(getIntents('create_update', new_intent));
      dispatch(notifyAction(message));
    } catch (error) {
      throw (error);
    }
  }
};

export const deleteIntent = (intent_id = "") => {
  let message = "Intent removida com sucesso!";
  let url_delete = INTENT_URL_API_GET_DELETE + intent_id;

  return async (dispatch) => {
    try {
      await axios.delete(url_delete);
      await dispatch(getIntents('delete'));
      dispatch(notifyAction(message));
    } catch (error) {
      throw (error);
    }
  }
};

export const notifyAction = (message) => {
  return {
    type: "SUCESS_ACTION_INTENT",
    text: message
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

export const createNewIntent = () => {
  return {
    type: "CREATE_NEW_INTENT",
    new_intent: new Intent(),
    selected_item_position: -1
  };
}

export const setItemName = (intent_name = "") => {
  return {
    type: "SET_INTENT_NAME",
    intent_name: intent_name
  };
}

export const addIntentText = () => {
  const intent = new Intent();
  return {
    type: "ADD_INTENT_TEXT",
    text: { ...intent.intent[0] }
  };
}

const setIntentTextAction = (intent_position, text_position, text) => {
  return {
    type: "SET_INTENT_TEXT",
    text: text,
    text_position: text_position,
    intent_position: intent_position
  };
}

export const removeIntentText = (intent_position, text_position) => {
  return {
    type: "REMOVE_INTENT_TEXT",
    text_position: text_position,
    intent_position: intent_position
  };
}

export const undoTextRemotion = () => {
  return { type: "UNDO_INTENT_TEXT_REMOVAL" };
}


export const setIntentText = (position, text, current_intent) => {
  return async (dispatch) => {
    dispatch(setIntentTextAction(position, text, current_intent));
  }
}

export const saveData = (current_intent, intents) => {
  return async (dispatch) => {
    let founded = intents.find((intent) => (intent._id !== current_intent._id));

    if (founded !== undefined && (current_intent._id !== undefined)) {
      if (current_intent._id !== undefined) {
        dispatch(updateIntent(current_intent, current_intent._id));
      } else {
        await dispatch(createIntent(current_intent));
        await dispatch(getIntents(current_intent.nameIntent));
      }
    } else {
      dispatch(saveDataError());
    }
  }
}