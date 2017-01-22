import * as types from 'PostTypes'
import $ from 'jquery'

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

  dispatch(fetchPosts())
}

export const filterPosts = filter => (dispatch, getState) => {
  dispatch({
    type: types.FILTER_POSTS,
    order: filter
  })

  dispatch(fetchPosts())
}

export const searchPosts = query => (dispatch, getState) => {
  dispatch({
    type: types.SEARCH_POSTS,
    search: query
  })

  dispatch(fetchPosts())
}

const setHeaders = (jwt) => {
  return {
    'Content-Type':'application/json',
    ...jwt && {'authorization': `Bearer ${jwt}`}
  }
}

export const fetchPosts = () => (dispatch, getState) => {

  let state = getState().postReducer
  let jwt = getState().userReducer.jwt

  let options = {
    order: state.order,
    page: state.page,
    per: state.per,
    search: state.search
  }

  $.ajax({
    method: 'GET',
    url: `${BASE_URL}/api/posts`,
    headers: setHeaders(jwt),
    data: options
  })
    .done(response => {
      if (response.ok) {
        dispatch(receivePosts(response))
      }
    })
}

export const addPost = data => (dispatch, getState) => {
  let jwt = getState().userReducer.jwt

  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/api/posts`,
    headers: setHeaders(jwt),
    data: data
  })
    .done(response => {
      if (response.ok) {
        dispatch(fetchPosts())
      }
    })
}

export const removePost = id => (dispatch, getState) => {
  let jwt = getState().userReducer.jwt

  $.ajax({
    url: `${BASE_URL}/api/posts/${id}`,
    type: 'DELETE',
    headers: setHeaders(jwt),
  })
    .done(response => {
      if (response.ok) {
        dispatch(fetchPosts())
      }
    })
}
