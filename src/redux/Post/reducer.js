import { GET_ALL_POSTS, GET_CATEGORY_POSTS, ADD_POST, EDIT_POST, VOTE_POST } from './actions'
import _ from 'lodash'

export default function(state = [], action) {
  switch(action.type) {
    case GET_ALL_POSTS:
     //if current state contain a post with id identical from payload, remove it
     if(state.length > 0){
       let removedDuplicatedPost = state.filter(post => post.id !== action.payload.id)
       //append the updated post from payload
       return _.sortBy(_.uniqBy(removedDuplicatedPost.concat(action.payload), 'id'), 'voteScore').reverse()
     } else {
       //just concat the state when the component mount for the first time
       return _.sortBy(_.uniqBy(action.payload.concat(state), 'id'), 'voteScore').reverse()
     }
     case GET_CATEGORY_POSTS:
       // Merge all posts and filter post with the same category
       let allCatPosts = state.concat(action.payload).filter(cat => cat.category === action.category).reverse()
       //Remove duplicated id, keep the most recent one
       let removedDuplicateCatPost = _.uniqBy(allCatPosts, 'id')
        // then sort by dec. voteScore and return
       return _.sortBy(removedDuplicateCatPost, 'voteScore').reverse()
    case ADD_POST:
      return _.reverse(state.concat(action.payload))
    case EDIT_POST:
      const filteredPost = state.filter(post => post !== action.id)
      return _.uniqBy(filteredPost.concat(action.updatedPost).reverse(), 'id')
    case VOTE_POST:
      const newVotedState = state.filter(post => post.id !== action.id)
      return _.sortBy(newVotedState.concat(action.post), 'voteScore').reverse()
    default:
      return state
  }
}
