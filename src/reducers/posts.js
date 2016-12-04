import * as types from '../constants/PostTypes'

const initialPostState = {
  posts: []
}

export default function postReducer(state = initialPostState, action) {
  switch (action.type) {
    case types.RECEIVE_POSTS:
      console.log("action", action)
      return {
        ...state,
        posts: action.posts,
        meta: action.meta
      }
    default:
      return state
  }
}
