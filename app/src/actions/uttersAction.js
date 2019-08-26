import axios from "axios";
import {
  Utter
} from '../utils/utter.js'

//const BASE = "http://localhost:3030/";
const BASE = "https://botflow.api.lappis.rocks/";

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
      }
    } catch (error) {
      throw (error);
    }
  }
};

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
      await axios.put(url, new_utter)
      .then(res => console.log(res));
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
      await dispatch(getUtters(undefined, true));
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

export const selectItem = (item_id = "") => {
    return {
      type: "SELECT_UTTER",
      utter_id: item_id,
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

export const undoTextRemotion = () => { return { type: "UNDO_UTTER_TEXT_REMOVAL" }; }

export const setUtterText = (utter_position, text_position, text, current_utter) => {
  return async (dispatch) => {
    dispatch(setUtterTextAction(utter_position, text_position, text,
      current_utter));
  }
}

export const saveData = (current_utter, utters) => {
  return async(dispatch) => {
    let founded = searchUtters(utters, current_utter);
    if(founded.length ===0){
      if (current_utter._id !== undefined){
          dispatch(updateUtter(current_utter, current_utter._id));
      } else{
          await dispatch(createUtter(current_utter));
          await dispatch(getUtters(current_utter.nameUtter));
      }
    }else{
      dispatch(saveDataError());
    }
  }
}

const searchUtters = (utters, u) => {
  let response = []
  utters.forEach(utter =>{
    if (utter.nameUtter === u.nameUtter && utter._id !== u._id){
      response.push(utter);
    }
  })
  return response;

}

export const saveDataError = () => {   
  return {
  type : "SAVE_DATA", 
  helper_text : "Por favor, insira um nome não repetido."
  };
}

export const changeUtterForm = (alternatives, current_utter) => {
  console.log("current_utter", current_utter);
  let old_utters = current_utter.utters;
  let texts = [];
  let new_utters = [];
    old_utters.forEach(i => {
      i.utterText.forEach(j => {
        texts.push(j.text);
      })
    })

  // true
  if(!alternatives){
    texts.forEach(text => {
      let utter = {'utterText': [
        {'text': text}
      ]};
      new_utters.push(utter);
    })

  } else {

  let utters = {"utterText": []}
  texts.forEach(text => {
    let utter = {"text": text};
    utters["utterText"].push(utter);
  })
  new_utters.push(utters);  
}

  return{
    type: "CHANGE_UTTER_FORM", alternatives: !alternatives, utters: new_utters
  }
  
}