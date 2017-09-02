import { SELECT_CATEGORY } from './actions'

export default function(state = '', action ) {
  switch(action.type) {
    case SELECT_CATEGORY:
      return action.payload
    default:
      return state
  }
}
