import axios from "axios";
import {
  Utter
} from '../utils/utter.js'

//const BASE = "https://botflow.api.lappis.rocks/";
const BASE = "http://localhost:3030/";

const UTTER_URL_API_GET_DELETE = BASE + "utter/";
const UTTER_URL_API_CREATE_UPDATE = BASE + "project/utter/";

export const getUtters = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(UTTER_URL_API_CREATE_UPDATE);
      dispatch({ type: "GET_UTTERS", utters: response.data });
    } catch (error) {
      throw (error);
    }
  }
};

export const createUtter = (new_utter = {}) => {
  let message = "Utter criada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.post(UTTER_URL_API_CREATE_UPDATE, new_utter);
      dispatch(successAction(message));
      dispatch(getUtters());
    } catch (error) {
      throw (error);
    }
  }
};

export const updateUtter = (new_utter = {}, utter_id) => {
  let url = UTTER_URL_API_GET_DELETE + utter_id;
  let message = "Utter atualizada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.put(url, new_utter);
      dispatch(successAction(message));
      dispatch(getUtters());
      console.log("Entrou aqui", utter_id, new_utter);
    } catch (error) {
      throw (error);
    }
  }
};

export const removeUtter = (utter_id = "") => {
  let message = "Utter removida com sucesso!";
  let url_delete = UTTER_URL_API_GET_DELETE + utter_id;

  return async (dispatch) => {
    try {
      await axios.delete(url_delete);
      dispatch(successAction(message));
      dispatch(getUtters());
    } catch (error) {
      throw (error);
    }
  }
};

export const successAction = (message) => {
  return {
    type: "SUCESS_ACTION_UTTER",
    text: message
  };
};

export const selectItem =
  (item_id = "") => {
    return {
      type: "SELECT_ITEM",
      utter_id: item_id,
      utter_submit_button_enable: false,
    };
  }

export const createNewUtter = () => {
  return {
    type: "CREATE_NEW_UTTER",
    new_utter: new Utter()
  };
}

export const setUtterName = (utter_name = "") => {
  let helper_text = "";
  let regex = /^[\w\d_]+$/;

  if (!regex.test(utter_name)) {
    helper_text = "Use apenas letras sem acentos, números ou '_'";
    utter_name = utter_name.substr(0, utter_name.length - 1);
  };

  return {
    type: "SET_UTTER_NAME",
    utter_name: utter_name,
    helper_text: helper_text
  };
}

export const addUtterText = () => {
  const utter = new Utter();
  return { type: "ADD_UTTER_TEXT", text: { ...utter.utters[0] } };
}

const setUtterTextAction = (utter_position, text_position, text) => {
  return {
    type: "SET_UTTER_TEXT",
    text: text,
    text_position: text_position,
    utter_position: utter_position
  };
}

export const removeUtterText = (text_position) => {
  return {
    type: "REMOVE_UTTER_TEXT",
    text_position: text_position
  };
}

export const undoTextRemotion = () => { return { type: "UNDO_TEXT_REMOVAL" }; }

export const isEnableUtterButton = (current_utter) => {
    let has_name = current_utter.nameUtter.length > 0;
    let is_enable = checkNonEmptyFields(current_utter);

    return {
      type: "IS_ENABLE_BUTTON",
      utter_submit_button: is_enable && has_name
    };
  }

const checkNonEmptyFields = (current_utter) => {
  let is_enable = true;

  current_utter.utters.forEach(utter => {
    utter.utterText.forEach(text => {
      if ((text.text).trim().length === 0) {
        is_enable = false;
      }
    })
  });

  return is_enable;
}

export const setUtterText = (utter_position, text_position, text, current_utter) => {
    return async (dispatch) => {
      dispatch(setUtterTextAction(utter_position, text_position, text,
        current_utter));
      dispatch(isEnableUtterButton(current_utter));
    }
  }

export const saveData = (current_utter, utters) => {
  let message = {
    type: "SAVE_DATA",
    helper_text: ""
  };

  return async (dispatch) => {
    if (current_utter._id !== undefined) {
      console.log("Entrou no 1");
      dispatch(updateUtter(current_utter, current_utter._id));
    } else {
      console.log("Entrou no 2");
      let founded =
        utters.find((utter) => utter.nameUtter === current_utter.nameUtter);

      if (founded === undefined) {
        dispatch(createUtter(current_utter));
      }
    }
    console.log("Entrou");
    message.helper_text = "Por favor, insira um nome não repetido.";
    
    return message;
  }
}
