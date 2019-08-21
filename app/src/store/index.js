import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index;js';
import { Utter } from '../utils/utter.js';
import { Intent } from '../utils/intent.js';

const INITIAL_STATE = {
  utters: [],
  filtered_utters: [],

  old_utter_texts: [],

  current_utter: new Utter(),
  old_utter: new Utter(),

  helper_text: "",

  alternatives: false,

  intents: [],
  filtered_intents: [],

  old_intents_texts: [],

  current_intent: new Intent(),
  old_intent: new Intent(),
};

function configureStore(state = INITIAL_STATE) {
  return createStore(reducer, state, applyMiddleware(thunk));
}

export default configureStore;
