import * as types from '../constants/PostTypes'

const initialPostState = {
  posts: [],
  per: 3,
  page: 1,
  order: "ASC"
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
    case types.PAGINATE_POSTS:
      return {
        ...state,
        page: action.page,
        order: "ASC"
      }
    case types.FILTER_POSTS:
      return {
        ...state,
        page: 1,
        order: action.order
      }
    default:
      return state
  }
}
