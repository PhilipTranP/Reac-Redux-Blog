import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import _ from 'lodash'

import { getAllCategories, selectCategory } from '../../redux/Category/actions'

import { getPostComments, removeComment, addComment } from '../../redux/Comment/actions'

import { getCategoryPosts, getAllPosts, addPost } from '../../redux/Post/actions'


import Home from '../Home'
import Category from '../Category'
import Header from '../Header'
import Navigation from '../Header/Navigation'
import Alerts from '../Alert'

import Post from '../Post'


class App extends Component {

  componentDidMount(){
    this.props.getAllCategories()
  }


  renderCategoryLink() {
    return this.props.categories.map(cat => (
      <li className="mr3" key={cat.path} onClick={(e) => {
        e.preventDefault()
        this.props.getCategoryPosts(cat.title)
        this.props.selectCategory(cat.title)}}><Link to={`/${cat.path}`} className="black-80 link dim pointer"
      >{_.startCase(cat.title)}</Link></li>
    ))
  }
  renderHomeLink() {
    return (
      <li className="mr3" onClick={e => {
        e.preventDefault()
        this.props.getAllPosts()}}><Link to='/' className="black-80 link dim pointer"
      >Home</Link></li>
    )
  }


  render() {
    const { history } = this.props

    return (
      <ConnectedRouter history={history}>

        <div className="App">
          <Alerts />
          <Header />
          <Navigation homeLink={this.renderHomeLink()} categoryLink={this.renderCategoryLink()}/>
          <Switch>
            <Route exact path='/' component={Home}/>
              )}/>
            <Route exact path={`/:category`} component={Category} />

            <Route exact path={`/:category/:id`} component={Post}/>

            <Route path={`/posts/:id`} component={Post}/>
          </Switch>
       </div>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {category, categories, posts, postComments, alertData, message } = state
  const {hash} = state.router.location
  return {
    hash,
    category,
    categories,
    posts,
    postComments,
    alertData,
    message
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllCategories,
    getCategoryPosts,
    getAllPosts,
    getPostComments,
    removeComment,
    addComment,
    addPost,
    selectCategory
  }, dispatch)
}


App.propTypes = {
  history: PropTypes.object,
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
