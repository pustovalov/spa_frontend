import { combineReducers } from 'redux'
import postReducer from './posts.js'
import userReducer from './user.js'

const rootReducer = combineReducers({
  postReducer,
  userReducer
})

export default rootReducer
