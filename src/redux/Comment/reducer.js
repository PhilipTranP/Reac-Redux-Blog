import { GET_POST_COMMENTS, ADD_COMMENT, DELETE_COMMENT, UPVOTE_COMMENT, TOGGLE_EDIT_FORM, EDIT_COMMENT } from './actions'
import _ from 'lodash'


export default function(state = [], action) {
  switch(action.type) {
    case GET_POST_COMMENTS:
      let allComments =  _.uniqBy(action.payload.concat(state), 'id').filter(comment =>
        comment.parentId === action.parentId)
      //assing isEditing = false for all comment
        let commentWithAddedisEditing = allComments.map(comment => {
          let AddedisEditing = Object.assign({}, comment)
          AddedisEditing.isEditing = false
          return AddedisEditing
        })
      return _.sortBy(commentWithAddedisEditing.filter(comment => comment.deleted === false), 'timestamp')

    case ADD_COMMENT:
      return _.reverse(state.concat(action.payload))

    case DELETE_COMMENT:
      let newStateAfterDeleted = state.map(function(comment) {
        if(comment.id === action.payload) {
          comment.deleted = true
        } return comment
      })
      return newStateAfterDeleted.filter(function(comment) {
        if(comment.deleted === false){
          return comment
        }
        return comment
      })
    case UPVOTE_COMMENT:
      return state.map(comment => {
          if (comment.id === action.id) {
            return action.comment
          }
          return comment
        })
    case  TOGGLE_EDIT_FORM:
      return state.map(comment => {
        if (comment.id === action.id) {
          let commentWithNewIsEditingField = Object.assign({}, comment)
          commentWithNewIsEditingField.isEditing = !commentWithNewIsEditingField.isEditing
          return commentWithNewIsEditingField
        } else {
          return comment
        }
      })
    case EDIT_COMMENT:
      return state.map(comment => {
        if(comment.id === action.id) {
          let newUpdatedComment = Object.assign({}, comment)  //clone a new comment
          newUpdatedComment.timestamp = action.comment.timestamp //assign new timestamp
          newUpdatedComment.body = action.comment.body //assing new body
          return newUpdatedComment //replace old comment with the new one
        } else {
          return comment
        }
      })
    default:
      return state
  }
}
