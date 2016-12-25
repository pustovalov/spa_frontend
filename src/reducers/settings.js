import * as types from 'SettingsTypes'

let user = JSON.parse(localStorage.getItem('user')) || {}

const initialState = {
  isFetching: false,
  errorMessage: '',
  isAuthenticated: user.jwt ? true : false,
  isAdmin: user.is_admin ? user.is_admin : false,
  userName: user.name ? user.name : '',
  userEmail: user.email ? user.email : ''
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SETTINGS_START_TYPE:
      return {
        ...state,
        errorMessage: ''
      }
      case types.SETTINGS_CHANGE_LOCALE:
        return {
          ...state,
          errorMessage: '',
          userLocale: action.userLocale
        }
        case types.SETTINGS_ERROR:
          return {
            ...state,
            errorMessage: action.errorMessage
          }
      case types.SETTINGS_RECEIVE_DATA:
        return {
          ...state,
          errorMessage: '',
          availableLocales: action.availableLocales,
          userEmail: action.userEmail,
          isAdmin: action.isAdmin,
          userName: action.userName,
          userLocale: action.userLocale
        }
    default:
      return state
  }
}
