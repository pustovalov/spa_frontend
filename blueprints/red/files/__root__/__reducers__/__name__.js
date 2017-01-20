export default function <%= pascalEntityName %>Reducer(state = initialState, action) {
  switch (action.type) {
    case types.TEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
        isAdmin: false
      }
    default:
      return state
  }
}
