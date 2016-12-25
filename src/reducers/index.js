import { combineReducers } from 'redux'
import postReducer from './posts.js'
import authReducer from './auth.js'
import settingsReducer from './settings.js'

const rootReducer = combineReducers({
  postReducer,
  authReducer,
  settingsReducer
})

export default rootReducer
