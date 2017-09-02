// export function sortedArray(posts, sortingPref) {
//   function arrayFromObject(obj, key = 'id') {
//     return Object.keys(obj).map(key => (obj[key]));
//   }
//   const postsArray = arrayFromObject(posts, 'id');
//   if (sortingPref) {
//     switch (sortingPref) {
//       case 'byScore':
//         return postsArray.sort((a, b) => (a.voteScore < b.voteScore));
//       case 'byDate':
//         return postsArray.sort((a, b) => (a.timestamp < b.timestamp));
//       default:
//         return postsArray;
//     }
//   } else {
//     return postsArray;
//   }
// }
