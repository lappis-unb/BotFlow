import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import utterReducer from '../reducers/utterReducer'
import { createStore, applyMiddleware } from 'redux';
import intentReducer from '../reducers/intentReducer.js'
import storyReducer from '../reducers/storyReducer.js'

function configureStore() {
  return createStore(
    combineReducers({ utterReducer, intentReducer, storyReducer }),
    applyMiddleware(thunk)
  );
}

export default configureStore;
