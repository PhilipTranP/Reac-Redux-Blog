import { GET_ALL_POSTS, GET_CATEGORY_POSTS, ADD_POST, EDIT_POST, VOTE_POST, DELETE_POST } from './actions'

import sortBy from 'lodash.sortby'
import uniqBy from 'lodash.uniqby'

export default function(state = [], action) {
  switch(action.type) {
    case GET_ALL_POSTS:
     //if current state contain a post with id identical from payload, remove it
     if(state.length > 0){
       let removedDuplicatedPost = action.payload.concat(state).filter(post => post.id !== action.payload.id)
       //append the updated post from payload
       let initialPosts = sortBy(uniqBy(removedDuplicatedPost.concat(action.payload), 'id'), 'voteScore').reverse()
       return initialPosts.filter(post => post.deleted === false)
     } else {
       //just concat the state when the component mount for the first time
       let initialPostState =  sortBy(uniqBy(action.payload.concat(state), 'id'), 'voteScore').reverse()
       return initialPostState.filter(post => post.deleted === false)
     }
     case GET_CATEGORY_POSTS:
       // Merge all posts and filter post using deleted tag then category
       let allCatPosts = state.concat(action.payload).filter(cat => cat.category === action.category).reverse()
       //Remove duplicated id, keep the most recent one
       let removedDuplicateCatPost = uniqBy(allCatPosts, 'id')
        // then sort by dec. voteScore and return
       let catPostsBeforeDeleted = sortBy(removedDuplicateCatPost, 'voteScore').reverse()
       return catPostsBeforeDeleted.filter(post => post.deleted === false)
    case ADD_POST:
      return state.concat(action.payload).reverse()
    case EDIT_POST:
      const filteredPost = state.filter(post => post !== action.id)
      return uniqBy(filteredPost.concat(action.updatedPost), 'id')
    case VOTE_POST:
      const newVotedState = state.filter(post => post.id !== action.id)
      return sortBy(newVotedState.concat(action.post), 'voteScore').reverse()
    case DELETE_POST:
      return state.filter(post => post.deleted !== true)
    default:
      return state
  }
}
