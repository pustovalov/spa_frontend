import { combineReducers } from 'redux'
import postReducer from './posts.js'
import authReducer from './auth.js'

const rootReducer = combineReducers({
  postReducer,
  authReducer
})

export default rootReducer
