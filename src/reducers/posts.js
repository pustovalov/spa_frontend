import * as types from '../constants/PostTypes'

const initialPostState = {
  posts: []
}

export default function postReducer(state = initialPostState, action) {
  switch (action.type) {
    case types.RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}
