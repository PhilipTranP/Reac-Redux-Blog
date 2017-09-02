import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/root_reducer'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const history = createBrowserHistory()


const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      logger,
      thunk,
    ),
  ),
)

render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
