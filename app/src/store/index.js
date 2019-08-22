import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import utterReducer from '../reducers/utterReducer';
import { Utter } from '../utils/utter.js';

const INITIAL_STATE = {
  utters: [],
  filtered_utters: [],
  
  old_utter_texts: [],

  current_utter: new Utter(),
  old_utter: new Utter(),
  
  utter_submit_button_enable: false,
  helper_text: "",

  alternatives: false
};

function configureStore(state = INITIAL_STATE) {
  return createStore(utterReducer, state, applyMiddleware(thunk));
}

export default configureStore;
