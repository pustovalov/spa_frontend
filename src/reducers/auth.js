import * as types from '../constants/LoginTypes'

let user = JSON.parse(localStorage.getItem('user')) || {}

const initialState = {
  isFetching: false,
  errorMessage: '',
  isAuthenticated: user.jwt ? true : false,
  isAdmin: user.is_admin ? user.is_admin : false,
  userName: user.name ? user.name : ''
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
        isAdmin: false
      }
    case types.LOGIN_SUCCESS:
      console.log("action", action)
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        isAdmin: action.isAdmin,
        errorMessage: '',
        userName: action.user_name
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case types.LOGIN_START_TYPE:
      return {
        ...state,
        errorMessage: ''
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        userName: '',
        isAdmin: false
      }
    default:
      return state
  }
}
