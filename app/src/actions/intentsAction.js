import axios from "axios";
import {
  Intent
} from '../utils/intent.js'

const BASE = "https://botflow.api.lappis.rocks/";
//const BASE = "http://localhost:3030/";

const INTENT_URL_API_GET_DELETE = BASE + "intent/";
const INTENT_URL_API_CREATE_UPDATE = BASE + "project/intent/";

export const getIntents = (name = undefined, deleted = false) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(INTENT_URL_API_CREATE_UPDATE);
      let intents = await sortIntentName(response.data);
      await dispatch({type : "GET_INTENTS", intents : intents});
      if(deleted){
        dispatch(selectItem(intents[0]._id));
      }else if(name){
        let id = findByName(name,intents);
        await dispatch(selectItem(id))
      }
    } catch (error) {
      throw (error);
    }
  }
};

const findByName = (name, intents) => {
  let id = intents[0]._id;

  intents.forEach( intent => {
    if(intent.nameIntent === name){
      id = intent._id;
    }

  });

  return id;
}

const sortIntentName = (intents) =>{
  // sorts alphabetically intents in sidebar
  intents.sort(function(a, b){
      if(a['nameIntent'] <  b['nameIntent']) { return -1; }
      if(a['nameIntent'] >  b['nameIntent']) { return 1; }
      return 0;
  })

  return intents;
}
export const createIntent = (new_intent = {}) => {
  let message = "Intent criada com sucesso!";

  return async (dispatch) => {
    try {
      await axios.post(INTENT_URL_API_CREATE_UPDATE, new_intent);
      dispatch(successAction(message));
      dispatch(getIntents());
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
      dispatch(successAction(message));
      await dispatch(getIntents());
    } catch (error) {
      throw (error);
    }
  }
};

export const removeIntent = (intent_id = "") => {
  let message = "Intent removida com sucesso!";
  let url_delete = INTENT_URL_API_GET_DELETE + intent_id;

  return async (dispatch) => {
    try {
      await axios.delete(url_delete);
      dispatch(successAction(message));
      dispatch(getIntents(undefined, true));
    } catch (error) {
      throw (error);
    }
  }
};

export const successAction = (message) => {
  return {
    type: "SUCESS_ACTION_INTENT",
    text: message
  };
};

export const selectItem =
  (item_id = "") => {
    console.log('ta no errado');
    
    return {
      type: "SELECT_INTENT",
      intent_id: item_id,
      intent_submit_button_enable: false,
    };
  }

export const createNewIntent= () => {
  return {
    type: "CREATE_NEW_INTENT",
    new_intent: new Intent()
  };
}

export const setIntentName = (intent_name = "") => {
  let helper_text = "";
  let regex = /^[\w\d_]+$/;

  if (!regex.test(intent_name)) {
    helper_text = "Use apenas letras sem acentos, números ou '_'";
    intent_name = intent_name.substr(0, intent_name.length - 1);
  };

  return {
    type: "SET_INTENT_NAME",
    intent_name: intent_name,
    helper_text: helper_text
  };
}

export const addIntentText = () => {
  const intent = new Intent();
  return { type: "ADD_INTENT_TEXT", text: { ...intent.intent[0] } };
}

const setIntentTextAction = (position, text) => {
  return {
    type: "SET_INTENT_TEXT",
    text: text,
    position: position
  };
}

export const removeIntentText = (text_position) => {
  return {
    type: "REMOVE_INTENT_TEXT",
    text_position: text_position
  };
}

export const undoTextRemotion = () => { return { type: "UNDO_INTENT_TEXT_REMOVAL" }; }

export const isEnableIntentButton = (current_intent) => {    
    let has_name = current_intent.nameIntent.length > 0;
    let is_enable = checkNonEmptyFields(current_intent);

    return {
      type: "IS_ENABLE_BUTTON_INTENT",
      intent_submit_button: is_enable && has_name
    };
  }

const checkNonEmptyFields = (current_intent) => {
  let is_enable = true;

  current_intent.intent.forEach(intent => {
      if ((intent.text).trim().length === 0) {
        is_enable = false;
      }
  });

  return is_enable;
}

export const setIntentText = (position, text, current_intent) => {
    return async (dispatch) => {
      dispatch(setIntentTextAction(position, text,
        current_intent));
      dispatch(isEnableIntentButton(current_intent));
    }
  }

export const saveData = (current_intent, intents) => {
  return async(dispatch) => {
    let founded = searchIntents(intents, current_intent);
    if(founded.length ===0){
      if (current_intent._id !== undefined){
          dispatch(updateIntent(current_intent, current_intent._id));
      } else{
          await dispatch(createIntent(current_intent));
          await dispatch(getIntents(current_intent.nameIntent));
      }
    }else{
      dispatch(saveDataError());
    }
  }
}

const searchIntents = (intents, u) => {
  let response = []
  intents.forEach(intent =>{
    if (intent.nameIntent === u.nameIntent && intent._id !== u._id){
      response.push(intent);
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
