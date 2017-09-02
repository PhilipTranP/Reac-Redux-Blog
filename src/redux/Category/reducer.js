import { GET_ALL_CATEGORIES, ACTIVE_CATEGORY } from './actions'

export default function(state = [], action) {
  switch(action.type) {
    case GET_ALL_CATEGORIES:
      return action.payload.concat(state).map(category => {
        if(!category.isActive){
          category.isActive = false
        }
        return category
      })
    case ACTIVE_CATEGORY:
        return state.map(category => {
          if(category.title === action.payload){
            category.isActive = true
          }else {
            category.isActive = false
          }
          return category
        })
    default:
      return state
  }
}
