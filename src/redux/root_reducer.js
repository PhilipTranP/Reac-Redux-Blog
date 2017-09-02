import { combineReducers } from 'redux'

//CATEGORIES
import arrayCategories from './Category/reducer'
import stringCategory from './Category/selectReducer'

//POST
import arrayPosts from './Post/reducer'
import objectPost from './Post/selectReducer'
// import allPostReducer from './Post/allPostReducer'
// import categoryPostReducer from './Post/categoryPostReducer'

import arrayComments from './Comment/reducer'

const rootReducer = combineReducers({
  //Categegory Data
  categories: arrayCategories,
  category: stringCategory,

  //Post Data
  posts: arrayPosts,
  selectedPost: objectPost,

  //Comment Data
  postComments: arrayComments, //TODO: commentComments
})

export default rootReducer
