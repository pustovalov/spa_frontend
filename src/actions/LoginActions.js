import * as types from '../constants/LoginTypes'

const BASE_URL = process.env.BASE_URL

export const receiveData = data => ({
  type: types.LOGIN,
  data
})
export const login = data => dispatch => {
  fetch(BASE_URL + '/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(response => response.json())
    .then(response => {
      if (response.ok) {
        dispatch(receiveData(response.result))
      }
    })
}
