import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Highlight from '../Highlight/index.js'
import AddPostModal from '../PopupModal/AddPostModal'

import { getCategoryPosts } from '../../redux/Post/actions'


class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      category: ''
    }
    this.closeModal = this.closeModal.bind(this)
    this.renderCategoryPosts = this.renderCategoryPosts.bind(this)
    this.refreshCategoryPage = this.refreshCategoryPage.bind(this)
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.getCategoryPosts(category)

  }

  refreshCategoryPage() {
    const category = this.props.match.params.category
    this.props.getCategoryPosts(category)
  }

  handleAddPost() {
    this.setState({openModal: true})
  }
  closeModal() {
    this.setState({openModal: false})
  }

  renderCategoryPosts() {
    return this.props.posts.map((post, index) => (
          <Highlight key={ Math.random().toString(36).substr(-8)} post={post} catId={post.id} catTitle={post.title} catBody={post.body} refreshCategoryPage={this.props.refreshCategoryPage} categoryFromUrl={this.props.match.params.category}/>
    ))
  }

  render(){

    return(
         <div className="mw9 center bg-near-white">
           <div className="ph2-ns mt1 flex flex-row flex-wrap justify-center">
             <section className="pa2 fl w-85 w-50-l">
               {this.renderCategoryPosts()}
             </section>
              <div className="pa2 fl w-20 db-l dn">
                <div onClick={()=>this.handleAddPost()} className="link green pointer">
                    <div className="bg-moon-gray h5 tc pv4">
                       <img src="https://cdn0.iconfinder.com/data/icons/iconico-3/1024/53.png" width="100px" alt="add-post"/>
                     <h2>Add Post</h2>
                   </div>
                 </div>
              </div>
           </div>
           <div>
            <AddPostModal openModal={this.state.openModal} closeModal={this.closeModal} category={this.props.category} />
           </div>
         </div>

    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getCategoryPosts
  }, dispatch)
}

function mapStateToProps(state, ownProps) {
  const { category, posts } = state
  return {
    ownProps,
    category,
    posts
  }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Category))
