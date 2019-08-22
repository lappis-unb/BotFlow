import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import utterReducer from '../reducers/utterReducer';
import { Utter } from '../utils/utter.js';
import reducer from '../reducers';

function configureStore(state) {
  return createStore(reducer, state, applyMiddleware(thunk));
}

export default configureStore;
