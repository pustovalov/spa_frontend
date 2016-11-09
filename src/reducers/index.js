import { combineReducers } from 'redux'
import postReducer from './posts.js'
import loginReducer from './login.js'

const rootReducer = combineReducers({
  postReducer,
  loginReducer
})

export default rootReducer
