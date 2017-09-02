import * as ReadableAPI from '../../utils/ReadableAPI'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY'


export function getAllCategories() {
  return dispatch => {
    ReadableAPI.fetchCategories().then(posts => {
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: posts
      })
    })
  }
}

export function selectCategory(option) {
  return {
    type: SELECT_CATEGORY,
    payload: option
  }
}

export function makeCategoryActive(category) {
  return {
    type: ACTIVE_CATEGORY,
    payload: category
  }
}
