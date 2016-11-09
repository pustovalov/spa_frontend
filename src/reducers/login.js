import * as types from '../constants/LoginTypes'

const initialState = {
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        data: action
      }
    default:
      return state
  }
}
