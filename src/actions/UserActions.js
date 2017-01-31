import * as types from 'UserTypes'
import { browserHistory } from 'react-router'
import $ from 'jquery'
import { setHeaders } from '../helpers'

// const generateAuthCreds = creds => {
//   let config = {
//     method: 'POST',
//     headers: { 'Content-Type':'application/json' },
//     body: creds
//   }
//
//   return config
// }

const BASE_URL = process.env.BASE_URL

const setUserData = response => ({
  type: types.RECEIVE_USER_DATA,
  isFetching: false,
  isAuthenticated: true,
  response
})

const setJWT = response => ({
  type: types.RECEIVE_JWT,
  response
})

const receiveAvailableLocales = response => ({
  type: types.RECEIVE_AVAILABLE_LOCALES,
  response
})

const userError = message => ({
  type: types.USER_ERROR,
  message
})

export const startType = () => ({
  type: types.USER_START_TYPE,
  errorMessage: ""
})

const successfulAuth = (response) => dispatch => {
  localStorage.setItem('user', JSON.stringify(response.user))
  localStorage.setItem('jwt', JSON.stringify(response.jwt))
  dispatch(setUserData(response))
  dispatch(setJWT(response.jwt))
  browserHistory.push('/')
}

const receiveUserData = (response) => dispatch => {
  dispatch(setUserData(response))
}

const makeAuthRequest = (url, creds) => dispatch => {
  let data = JSON.stringify(creds)

  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/${url}`,
    headers: setHeaders(),
    data: data
  })
    .done(response => {
      if (response.ok) {
        dispatch(successfulAuth(response))

      } else {
        dispatch(userError(response.message))
      }
    })
    .fail(response => {
      dispatch(userError(response.message))
    })
}

export const fetchSettingsData = () => (dispatch, getState) => {
  let state = getState().userReducer

  let data = {
    email: state.userEmail
  }
  let obj = JSON.stringify(data)

  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/settings`,
    headers: setHeaders(state.jwt),
    data: obj
  })
    .done(response => {
      if (response.ok) {
        dispatch(receiveUserData(response))
        dispatch(receiveAvailableLocales(response.available_locales))
      } else {
        dispatch(userError(response.message))
      }
    })
    .fail(response => {
      dispatch(userError(response.message))
    })
}

export const saveChanges = (data) => (dispatch, getState) => {
  let state = getState().userReducer
  let obj = JSON.stringify(data)

  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/settings/edit`,
    headers: setHeaders(state.jwt),
    data: obj
  })
    .done(response => {
      if (response.ok) {
        dispatch(receiveUserData(response))
        localStorage.setItem('user', JSON.stringify(response.user))
        if (state.userLocale != response.user) {
          location.reload()
        }
      } else {
        dispatch(settingsError(response.message))
      }
    })
    .fail(response => {
      dispatch(settingsError(response.message))
    })
}

export const loginUser = creds => dispatch => {
  dispatch(makeAuthRequest('log_in', creds))
}

export const signUpUser = creds => dispatch => {
  dispatch(makeAuthRequest('sign_up', creds))
}

const logOutUser = () => ({
  type: types.LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const logoutUser = () => dispatch => {
  localStorage.removeItem('user')
  localStorage.removeItem('jwt')
  dispatch(logOutUser())
  browserHistory.push('/')
}

export const setGuestLocale = (locale) => dispatch => {
  let user = {
    locale: locale
  }
  localStorage.setItem('user', JSON.stringify(user))
  location.reload()
}

export const changeLocale = (locale) => ({
  type: types.USER_CHANGE_LOCALE,
  errorMessage: "",
  userLocale: locale
})
