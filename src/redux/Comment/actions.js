import * as ReadableAPI from '../../utils/ReadableAPI'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const TOGGLE_EDIT_FORM = 'TOGGLE_EDIT_FORM'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const COMMENT_NAME_CHANGE = 'COMMENT_NAME_CHANGE'
export const COMMENT_BODY_CHANGE = 'COMMENT_BODY_CHANGE'
export const RESET_COMMENT_FORM = 'RESET_COMMENT_FORM'
export const SHOW_COMMENT_FORM = 'SHOW_COMMENT_FORM'


export function getPostComments(postId) {
  return dispatch => {
    ReadableAPI.fetchComments(postId).then(comments => {
      dispatch({
        type : GET_POST_COMMENTS,
        payload: comments,
        parentId: postId
      })
    })
  }
}

export function addComment(comment) {
  return dispatch => {
    ReadableAPI.addComment(comment).then(comments => {
      dispatch({
        type: ADD_COMMENT,
        payload: comments
      })
    })
  }
}

export function removeComment(commentId) {
  return dispatch => {
    ReadableAPI.deleteComment(commentId).then(comments => {
        dispatch({
          type : DELETE_COMMENT,
          payload: commentId
        })
    })
  }
}

export function upVoteComment(id, body) {
  return dispatch => {
    ReadableAPI.upVoteComment(id, body).then(comment => {
      dispatch({
        type: UPVOTE_COMMENT,
        comment,
        id
      })
    })
  }
}

export function toggleEditForm(id) {
  return {
    type: TOGGLE_EDIT_FORM,
    id
  }
}

export function editComment(id, body) {
  return dispatch => {
    ReadableAPI.editComment(id, body).then(comment => {
      dispatch({
        type: EDIT_COMMENT,
        comment,
        id
      })
    })
  }
}

export function commentNameChange(nameValue) {
  return {
    type: COMMENT_NAME_CHANGE,
    payload: nameValue
  }
}

export function commentBodyChange(bodyValue) {
  return {
    type: COMMENT_BODY_CHANGE,
    payload: bodyValue
  }
}

export function resetCommentForm() {
  return {
    type: RESET_COMMENT_FORM
  }
}
export function showCommentForm(bool) {
  return {
    type: SHOW_COMMENT_FORM,
    payload: bool
  }
}
