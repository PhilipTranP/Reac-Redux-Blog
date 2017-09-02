//TODO: Spend some times to explore an idea of architecting the store so that it is //easier to relate to //React Initial State //https://github.com/jamesmanone/readable/blob/master/src/actions/categoryActions.js

// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../root_reducer'
// import initialState from './initialState'
// import { createBrowserHistory } from 'history'
// import { routerMiddleware, connectRouter } from 'connected-react-router'
//
// const history = createBrowserHistory()
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//
// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }
//
// export default createStore(
//   connectRouter(history)(rootReducer),
//   initialState,
//   composeEnhancers(
//     applyMiddleware(
//       routerMiddleware(history),
//       logger,
//       thunk,
//     ),
//   ),
// )
