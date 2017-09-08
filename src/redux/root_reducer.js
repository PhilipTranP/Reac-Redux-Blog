import { combineReducers } from 'redux'

//CATEGORIES
import arrayCategories from './Category/reducer'
import stringCategory from './Category/selectReducer'

//POST
import arrayPosts from './Post/reducer'
import objectPost from './Post/selectReducer'
import objectPostFormData from './Post/formReducer'

//COMMENT
import arrayComments from './Comment/reducer'
import objectCommentFormData from './Comment/formReducer'

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
  formData: objectCommentFormData,
  formValue: objectPostFormData,
  //Alert Data
  alertData,
})

export default rootReducer
