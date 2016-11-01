import * as types from '../constants/PostTypes'

const BASE_URL = process.env.BASE_URL

export const addPost = post => ({
  type: types.ADD_POST,
  post
})

export const removePost = id => ({
  type: types.REMOVE_POST,
  id
})

export const receivePosts = posts => ({
  type: types.RECEIVE_POSTS,
  posts
})

export const fetchPosts = posts => dispatch => {
  return fetch(BASE_URL + '/api/posts')
    .then(response => response.json())
    .then(response => dispatch(receivePosts(response.result)))
}
