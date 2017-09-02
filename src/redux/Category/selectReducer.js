import { SELECT_CATEGORY } from './actions'

export default function(state = 'react', action ) {
  switch(action.type) {
    case SELECT_CATEGORY:
      return action.payload
    default:
      return state
  }
}
