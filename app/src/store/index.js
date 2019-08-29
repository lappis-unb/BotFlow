import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import utterReducer from '../reducers/utterReducer'
import { createStore, applyMiddleware } from 'redux';
import intentReducer from '../reducers/intentReducer.js'

function configureStore() {
  return createStore(
    combineReducers({ utterReducer, intentReducer }),
    applyMiddleware(thunk)
  );
}

export default configureStore;
