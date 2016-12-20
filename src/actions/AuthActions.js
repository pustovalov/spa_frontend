import * as types from '../constants/AuthTypes'
import { browserHistory } from 'react-router'

const BASE_URL = process.env.BASE_URL

const requestLogin = creds => ({
  type: types.LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})

const receiveLogin = user => ({
  type: types.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  isAdmin: user.is_admin,
  jwt: user.jwt,
  user_name: user.name
})

const loginError = message => ({
  type: types.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
})

export const loginStartType = () => ({
  type: types.LOGIN_START_TYPE,
  errorMessage: ""
})

const generateAuthCreds = creds => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: creds
  }

  return config
}

const successfulAuth = (response, dispatch) => {
  let user = {
    name: response.user.name,
    email: response.user.email,
    jwt: response.user.jwt,
    is_admin: response.user.is_admin
  }
  localStorage.setItem('user', JSON.stringify(user))
  dispatch(receiveLogin(response.user))
  browserHistory.push('/')
}

const makeAuthRequest = (url, creds, dispatch) => {
  let config = generateAuthCreds(creds)

  dispatch(requestLogin(creds))

  return fetch(`${BASE_URL}/${url}`, config)
    .then(response => response.json())
    .then(response =>  {
      if (response.ok) {
        successfulAuth(response, dispatch)
      } else {
        dispatch(loginError(response.message))
      }
    }).catch(err => console.log("Error: ", err))
}

export const loginUser = creds => dispatch => {
  makeAuthRequest('user_token', creds, dispatch)
}

export const signUpUser = creds => dispatch => {
  makeAuthRequest('sign_up', creds, dispatch)
}

const requestLogout = () => ({
  type: types.LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
})

const receiveLogout = () => ({
  type: types.LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const logoutUser = () => dispatch => {
  dispatch(requestLogout())
  localStorage.removeItem('user')
  dispatch(receiveLogout())
  browserHistory.push('/')
}
