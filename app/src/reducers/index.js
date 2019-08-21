import { combineReducers } from 'redux'
import utterReducer from './utterReducer'
import intentReducer from './intentReducer'

export default combineReducers({
  utterReducer,
  intentReducer
})