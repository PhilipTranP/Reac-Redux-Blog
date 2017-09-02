import * as ReadableAPI from '../../utils/ReadableAPI'

export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SELECT_POST = 'SELECT_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'


export function getAllPosts() {
  return dispatch => {
    ReadableAPI.fetchAllPosts().then(posts => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: posts
      })
    })
  }
}

export function getCategoryPosts(category) {
  return dispatch => {
    ReadableAPI.fetchPosts(category).then(posts => {
      dispatch({
        type: GET_CATEGORY_POSTS,
        payload: posts,
        category
      })
    })
  }
}

export function selectPost(id) {
  return dispatch => {
    ReadableAPI.fetchThePost(id).then(post => {
      dispatch({
        type: SELECT_POST,
        payload: post
      })
    })
  }
}

export function addPost(post) {
  return dispatch => {
    ReadableAPI.addPost(post).then(posts => {
      dispatch({
        type: ADD_POST,
        payload: posts
      })
    })
  }
}


export function editPost(id, body) {
  return dispatch => {
    ReadableAPI.editThePost(id, body).then(updatedPost => {
      dispatch({
        type : EDIT_POST,
        updatedPost,
        id
      })
    })
  }
}

export function votePost(id, body) {
  return dispatch => {
    ReadableAPI.votePost(id, body).then(post => {
      dispatch({
        type: VOTE_POST,
        post,
        id
      })
    })
  }
}

export function deletePost(id) {
  return dispatch => {
    ReadableAPI.deleteThePost(id).then(data => {
      dispatch({
        type : DELETE_POST,
        payload: data
      })
    })
  }
}
