import * as types from 'UserTypes'

let user = JSON.parse(localStorage.getItem('user')) || {}
let jwt = JSON.parse(localStorage.getItem('jwt')) || ''

const initialState = {
  isFetching: false,
  errorMessage: '',
  isAuthenticated: jwt ? true : false,
  isAdmin: user.is_admin ? user.is_admin : false,
  userName: user.name ? user.name : '',
  locale: user.locale ? user.locale : 'en',
  jwt: jwt ? jwt : ''
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_USER_DATA:
      let user = action.response.user
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        isAdmin: user.is_admin,
        errorMessage: '',
        userName: user.name,
        userLocale: user.locale,
      }
    case types.RECEIVE_JWT:
      return {
        ...state,
        jwt: action.response
      }
    case types.RECEIVE_AVAILABLE_LOCALES:
      return {
        ...state,
        availableLocales: action.response
      }

    case types.USER_CHANGE_LOCALE:
      return {
        ...state,
        errorMessage: '',
        userLocale: action.userLocale
      }
    case types.USER_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }
    case types.USER_START_TYPE:
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
