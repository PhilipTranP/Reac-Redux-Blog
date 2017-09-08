import { POST_AUTHOR_CHANGE, POST_TITLE_CHANGE, POST_BODY_CHANGE, POST_OPTION_CHANGE, RESET_POST_FORM } from './actions'
import assign from 'lodash.assign'

const initialState =  {author: '', title: '', body: '', option: '', formOpen: false}

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_AUTHOR_CHANGE:
      return {...state, author: action.payload}
    case POST_TITLE_CHANGE:
      return {...state, title: action.payload}
    case POST_BODY_CHANGE:
      return {...state, body: action.payload}
    case POST_OPTION_CHANGE:
      return {...state, option: action.payload}
    case RESET_POST_FORM:
      return initialState
    default:
      return state
  }
}
