import { COMMENT_NAME_CHANGE, COMMENT_BODY_CHANGE, RESET_COMMENT_FORM, SHOW_COMMENT_FORM } from './actions'
import assign from 'lodash.assign'
const initialState =  {name: '', body: '', formOpen: false}
export default function(state = initialState, action) {
  switch(action.type) {
    case COMMENT_NAME_CHANGE:
      return {...state, name: action.payload}
    case COMMENT_BODY_CHANGE:
      return {...state, body: action.payload}
    case SHOW_COMMENT_FORM:
      return {...state, formOpen: action.payload}
    case RESET_COMMENT_FORM:
      return initialState
    default:
      return state
  }
}
