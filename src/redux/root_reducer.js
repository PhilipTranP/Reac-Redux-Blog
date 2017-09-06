import { combineReducers } from 'redux'

//CATEGORIES
import arrayCategories from './Category/reducer'
import stringCategory from './Category/selectReducer'

//POST
import arrayPosts from './Post/reducer'
import objectPost from './Post/selectReducer'

//COMMENT
import arrayComments from './Comment/reducer'

//ALERT
import alertData from './Alert/reducer'

const rootReducer = combineReducers({
  //Categegory Data
  categories: arrayCategories,
  category: stringCategory,

  //Post Data
  posts: arrayPosts,
  selectedPost: objectPost,

  //Comment Data
  postComments: arrayComments, //TODO: commentComments

  //Alert Data
  alertData,
})

export default rootReducer
