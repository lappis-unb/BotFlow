import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';

import utterReducer from './utters'
import intentReducer from './intents'
import storyReducer from '../reducers/storyReducer'

function configureStore() {
  return createStore(
    combineReducers({ intent: intentReducer, utter: utterReducer, story: storyReducer}),
    applyMiddleware(thunk)
  );
}

export default configureStore;
