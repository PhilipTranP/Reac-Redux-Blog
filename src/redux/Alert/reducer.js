import { START_ALERT, STOP_ALERT } from './actions'

export default function (state = [], action) {
  switch (action.type) {
    case START_ALERT:
      return [...state, action.payload]
    case STOP_ALERT:
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state
  }
}
