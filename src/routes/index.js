import React from 'react'
import { Route, Switch } from 'react-router'
import App from '../containers/App'
import Hello from '../components/Hello'
import NoMatch from '../components/NoMatch'
import Header from '../components/Header'

const routes = (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/hello" component={Hello} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
