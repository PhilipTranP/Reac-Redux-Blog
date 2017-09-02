import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AlertContainer from 'react-alert'
import { FaTrashO } from 'react-icons/lib/fa'
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
    this.alertDeleted = this.alertDeleted.bind(this)
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.getCategoryPosts(category)
  }

  handleAddPost() {
    this.setState({openModal: true})
  }
  closeModal() {
    this.setState({openModal: false})
  }
  refreshCategoryPage(cat) {
    this.props.getCategoryPosts(cat)
  }
  renderCategoryPosts() {
    return this.props.posts.map((post, index) => (
          <Highlight key={post.id + index} post={post} refreshCategoryPage={this.refreshCategoryPage} alertDeleted={this.alertDeleted}/>
    ))
  }
  alertDeleted() {
    this.msg.show('Its gone to the trash for good now. ', {
      time: 5000,
      type: 'success',
      icon: <FaTrashO size="24" color="red" />
    })
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }
  render(){
    return(
         <div className="mw9 center bg-near-white">
           <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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

export default connect(mapStateToProps, matchDispatchToProps)(Category)
