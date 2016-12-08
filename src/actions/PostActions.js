import * as types from '../constants/PostTypes'
import { generateParams } from '../helpers'

const BASE_URL = process.env.BASE_URL
const NUMBER_PER_PARE = 3

export const receivePosts = response => ({
  type: types.RECEIVE_POSTS,
  posts: response.result,
  meta: response.meta
})

export const paginatePosts = page => (dispatch, getState) => {
  dispatch({
    type: types.PAGINATE_POSTS,
    page: page
  })

  let state = getState().postReducer
  let options = {
    order: state.order,
    page: state.page,
    per: state.per
  }
  dispatch(fetchPosts(options))
}

export const filterPosts = filter => (dispatch, getState) => {
  dispatch({
    type: types.FILTER_POSTS,
    order: filter
  })

  let state = getState().postReducer
  let options = {
    order: state.order,
    page: state.page,
    per: state.per
  }
  dispatch(fetchPosts(options))
}

export const fetchPosts = options => (dispatch, getState) => {
  let params = generateParams(options)

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
