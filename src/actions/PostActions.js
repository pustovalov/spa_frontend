import * as types from '../constants/PostTypes'

const BASE_URL = process.env.BASE_URL

export const receivePosts = posts => ({
  type: types.RECEIVE_POSTS,
  posts
})

export const fetchPosts = posts => dispatch => {
  return fetch(`${BASE_URL}/api/posts`)
    .then(response => response.json())
    .then(response => dispatch(receivePosts(response.result)))
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
