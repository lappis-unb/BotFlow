import axios from "axios";
import {
  Utter
} from '../utils/utter.js'

const BASE = "https://botflow.api.lappis.rocks/";
//const BASE = "http://localhost:3030/";

const UTTER_URL_API_GET_DELETE = BASE + "utter/";
const UTTER_URL_API_CREATE_UPDATE = BASE + "project/utter/";

export const getUtters = (name = undefined, deleted = false) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(UTTER_URL_API_CREATE_UPDATE);
      let utters = await sortUtterName(response.data);
      await dispatch({type : "GET_UTTERS", utters : utters});
      if(deleted){
        dispatch(selectItem(utters[0]._id));
      }else if(name){
        let id = findByName(name,utters);
        await dispatch(selectItem(id))
      }
    } catch (error) {
      throw (error);
    }
  }
};

const findByName = (name, utters) => {
  let id = utters[0]._id;

  utters.forEach( utter => {
    if(utter.nameUtter == name){
      id = utter._id;
    }

  });

  return id;
}

const sortUtterName = (utters) =>{
  // sorts alphabetically utters in sidebar
  utters.sort(function(a, b){
      if(a['nameUtter'] <  b['nameUtter']) { return -1; }
      if(a['nameUtter'] >  b['nameUtter']) { return 1; }
      return 0;
  })

  return utters;
}
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
      await dispatch(getUtters());
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
      dispatch(getUtters(undefined, true));
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

export const setUtterText = (utter_position, text_position, text, current_utter) => {
  return async (dispatch) => {
    dispatch(setUtterTextAction(utter_position, text_position, text,
      current_utter));
  }
}

export const saveData = (current_utter, utters) => {
  return async(dispatch) => {
    let founded =
    utters.find((utter) => utter.nameUtter === current_utter.nameUtter);
    if(founded === undefined){
      if (current_utter._id !== undefined) {
        dispatch(updateUtter(current_utter, current_utter._id));
      } else  {
        await dispatch(createUtter(current_utter));
        await dispatch(getUtters(current_utter.nameUtter));
      }
    }else{
      dispatch(saveDataError());
    }
  }
}

export const saveDataError = () => {   
  return {
  type : "SAVE_DATA", 
  helper_text : "Por favor, insira um nome não repetido."
  };
}