import * as types from '../constants/PostTypes'
import { generateParams } from '../helpers'

const BASE_URL = process.env.BASE_URL
const NUMBER_PER_PARE = 3

export const receivePosts = response => ({
  type: types.RECEIVE_POSTS,
  posts: response.result,
  meta: response.meta
})

export const fetchPosts = options => dispatch => {
  let page = options && options.page ? options.page : 1
  let config = {
    per: NUMBER_PER_PARE,
    page: page
  }

  let params = generateParams(config)

  return fetch(`${BASE_URL}/api/posts?${params}`)
    .then(response => response.json())
    .then(response => dispatch(receivePosts(response)))
}

export const addPost = data => dispatch => {
  fetch(`${BASE_URL}/api/posts`, {
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
        dispatch(fetchPosts())
      }
    })
}

export const removePost = id => dispatch => {
  fetch(`${BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      if (response.ok) {
        dispatch(fetchPosts())
      }
    })
}
