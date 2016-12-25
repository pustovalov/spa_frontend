import * as types from 'SettingsTypes'
import { browserHistory } from 'react-router'

const BASE_URL = process.env.BASE_URL

const generateCreds = creds => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: creds
  }

  return config
}

const receiveData = response => ({
  type: types.SETTINGS_RECEIVE_DATA,
  availableLocales: response.available_locales,
  userEmail: response.user.email,
  isAdmin: response.user.is_admin,
  userName: response.user.name,
  userLocale: response.user.locale
})

const settingsError = message => ({
  type: types.SETTINGS_ERROR,
  errorMessage: message
})

export const fetchData = () => (dispatch, getState) => {
  let state = getState().settingsReducer

  let data = {
    email: state.userEmail
  }

  let obj = JSON.stringify(data)

  let config = generateCreds(obj)

  return fetch(`${BASE_URL}/settings`, config)
    .then(response => response.json())
    .then(response =>  {
      if (response.ok) {
        dispatch(receiveData(response))
      } else {
        dispatch(settingsError(response.message))
      }
    }).catch(err => console.log("Error: ", err))
}

export const saveChanges = (data) => (dispatch, getState) => {
  let obj = JSON.stringify(data)
  let config = generateCreds(obj)


  return fetch(`${BASE_URL}/settings/edit`, config)
    .then(response => response.json())
    .then(response =>  {
      if (response.ok) {
        dispatch(receiveData(response))
      } else {
        dispatch(settingsError(response.message))
      }
    }).catch(err => console.log("Error: ", err))
}

export const startType = () => ({
  type: types.SETTINGS_START_TYPE,
  errorMessage: ""
})

export const changeLocale = (locale) => ({
  type: types.SETTINGS_CHANGE_LOCALE,
  errorMessage: "",
  userLocale: locale
})
