import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';

import intentReducer from './intents.js'
import itemReducer from '../reducers/itemReducer'
//import utterReducer from '../reducers/utterReducer'
//import storyReducer from '../reducers/storyReducer.js'

//,utter: utterReducer,  story: storyReducer 
function configureStore() {
  return createStore(
    combineReducers({ intent: intentReducer, item: itemReducer}),
    applyMiddleware(thunk)
  );
}

export default configureStore;
