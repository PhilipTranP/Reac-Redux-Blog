const api = "https://bagle-react-server.herokuapp.com"

let token = "3ddaff"



// if (!token)
//   token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// { headers: { 'Authorization': 'whatever-you-want' }}
function arrayFromObject(obj, key = 'id') {
  return Object.keys(obj).map(key => (obj[key]));
}
function fetchSortedPostsArray(posts, sortingPref) {
  const postsArray = arrayFromObject(posts, 'id');
  if (sortingPref) {
    switch (sortingPref) {
      case 'byScore':
        return postsArray.sort((a, b) => (a.voteScore < b.voteScore));
      case 'byDate':
        return postsArray.sort((a, b) => (a.timestamp < b.timestamp));
      default:
        return postsArray;
    }
  } else {
    return postsArray;
  }
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())
    .then(res => fetchSortedPostsArray(res, 'byDate'))


export const fetchPosts = (cat) =>
  fetch(`${api}/${cat}/posts`, {headers})
    .then(res => res.json())
    .then(res => fetchSortedPostsArray(res, 'byDate'))

export const addPost = (post) =>
  fetch((`${api}/posts`), {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
  }).then(res => res.json())

export const fetchThePost = (id) =>
  fetch(`${api}/posts/${id}`, {headers})
    .then(res => res.json())

export const editThePost = (id, body) =>
  fetch((`${api}/posts/${id}`), {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
   body: JSON.stringify(body)
 }).then(res => res.json())

export const votePost = (id, body) =>
  fetch((`${api}/posts/${id}`), {
     method: 'POST',
     headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
    body: JSON.stringify(body)
}).then(res => res.json())

export const fetchComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, {headers})
    .then(res => res.json())
    .then(res => fetchSortedPostsArray(res, 'byDate'))

export const addComment = (comment) =>
  fetch((`${api}/comments`), {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
  }).then(res => res.json())

export const fetchTheComment = (commentId) =>
    fetch((`${api}/comments/${commentId}`), {headers})
      .then(res => res.json())

export const upVoteComment = (commentId, body) =>
  fetch((`${api}/comments/${commentId}`), {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(body)
  }).then(res => res.json())


export const deleteComment = (id) =>
  fetch((`${api}/comments/${id}`), {
    method: 'DELETE',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())


export const editComment = (id, body) =>
  fetch((`${api}/comments/${id}`), {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
   body: JSON.stringify(body)
 }).then(res => res.json())
