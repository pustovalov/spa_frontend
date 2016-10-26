// Reducer
function posts(state = {}, action) {
  switch (action.type) {
    case 'ADD_POST':
      console.log('HEY')
    default:
      return state
  }
}

export default posts
