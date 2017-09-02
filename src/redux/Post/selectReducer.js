import { SELECT_POST } from './actions'

export default function(state = {}, action ) {
  switch(action.type) {
    case SELECT_POST:
      return state = Object.assign({}, action.payload)
    default:
      return state
  }
}
