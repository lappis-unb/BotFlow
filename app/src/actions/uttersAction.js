import axios from "axios";
import {
  Utter
} from '../utils/utter.js'

//const BASE = "http://localhost:3030/";
const BASE = "https://botflow.api.lappis.rocks/";

const UTTER_URL_API_GET_DELETE = BASE + "utter/";
const UTTER_URL_API_CREATE_UPDATE = BASE + "project/utter/";

export const getUtters = (operation = '', utter = undefined) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(UTTER_URL_API_CREATE_UPDATE);
      let utters = await sortUtterName(response.data);

      await dispatch({ type: "GET_UTTERS", utters: utters });

      if (operation === 'delete') {
        await dispatch(createNewUtter());
      } else if (operation === 'create_update') {
        await dispatch(selectItem(utter, 0, utters));
      }
    } catch (error) {
      throw (error);
    }
  }
};

const sortUtterName = (utters) => {
  // Sorts alphabetically utters in sidebar
  utters.sort(function (a, b) {
    if (a['nameUtter'] < b['nameUtter']) { return -1; }
    if (a['nameUtter'] > b['nameUtter']) { return 1; }
    return 0;
  })

  return utters;
}
export const createUtter = (new_utter) => {
  let message = "Utter criada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.post(UTTER_URL_API_CREATE_UPDATE, new_utter);
      await dispatch(getUtters('create_update', new_utter));
      dispatch(notifyAction(message));
    } catch (error) {
      throw (error);
    }
  }
};

export const updateUtter = (new_utter, utter_id) => {
  let url = UTTER_URL_API_GET_DELETE + utter_id;
  let message = "Utter atualizada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.put(url, new_utter);
      await dispatch(getUtters('create_update', new_utter));
      dispatch(notifyAction(message));
    } catch (error) {
      throw (error);
    }
  }
};

export const removeUtter = (utter = { _id: "" }) => {
  let message = "Utter removida com sucesso!";
  let url_delete = UTTER_URL_API_GET_DELETE + utter._id;

  return async (dispatch) => {
    try {
      await axios.delete(url_delete);
      await dispatch(getUtters('delete'));
      dispatch(notifyAction(message));
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

export const createNewUtter = () => {
  return {
    type: "CREATE_NEW_UTTER",
    new_utter: new Utter(),
    selected_item_position: -1
  };
}

export const setUtterName = (utter_name = "") => {
  return {
    type: "SET_UTTER_NAME",
    utter_name: utter_name
  };
}

export const addUtterText = () => {
  const utter = new Utter();
  return {
    type: "ADD_UTTER_TEXT",
    text: { ...utter.utters[0] }
  };
}

const setUtterTextAction = (utter_position, text_position, text) => {
  return {
    type: "SET_UTTER_TEXT",
    text: text,
    text_position: text_position,
    utter_position: utter_position
  };
}

export const removeUtterText = (utter_position, text_position) => {
  return {
    type: "REMOVE_UTTER_TEXT",
    text_position: text_position,
    utter_position: utter_position
  };
}

export const undoTextRemotion = () => {
  return { type: "UNDO_UTTER_TEXT_REMOVAL" };
}

export const setUtterText = (utter_position, text_position, text, current_utter) => {
  return async (dispatch) => {
    dispatch(setUtterTextAction(utter_position, text_position, text,
      current_utter));
  }
}

export const saveData = (current_utter, utters) => {
  return async (dispatch) => {
    let founded = utters.find((utter) => (utter._id !== current_utter._id));

    if ((founded !== undefined) && (current_utter._id !== undefined)) {
      dispatch(updateUtter(current_utter, current_utter._id));
    } else {
      await dispatch(createUtter(current_utter));
      await dispatch(getUtters(current_utter.nameUtter));
    }
  }
}

export const changeUtterForm = (have_alternatives, current_utter) => {
  let old_utters = current_utter.utters;
  let new_utters = [];
  let texts = [];

  old_utters.forEach(i => {
    i.utterText.forEach(j => {
      texts.push(j.text);
    })
  })

  if (have_alternatives) {
    new_utters = texts.map(text => ({ utterText: [{ text: text }] }));
  } else {
    new_utters = [{ utterText: texts.map(text => ({ text: text })) }];
  }

  return {
    type: "CHANGE_UTTER_FORM",
    have_alternatives: have_alternatives,
    utters: new_utters
  }
}

export const setHelperText = (helper_text) => {
  return {
    type: "SET_HELPER_TEXT",
    helper_text: helper_text
  }
}