import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Highlight from '../Highlight/index.js'
import AddPostModal from '../PopupModal/AddPostModal'

import { getAllPosts } from '../../redux/Post/actions'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false
    }
    this.closeModal = this.closeModal.bind(this)
    this.renderAllPosts = this.renderAllPosts.bind(this)
    this.refreshHomePage = this.refreshHomePage.bind(this)
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  handleAddPost() {
    this.setState({openModal: true})
  }
  closeModal() {
    this.setState({openModal: false})
  }

  refreshHomePage() {
    this.props.getAllPosts()
  }

  renderAllPosts() {
    return this.props.posts.map((post, index) => (
          <Highlight key={post.id + index} post={post} refreshHomePage={this.refreshHomePage} />
    ))
  }

  render(){
    return(
         <div className="mw9 center bg-near-white">

           <div className="ph2-ns mt1 flex flex-row flex-wrap justify-center">
             <section className="pa2 fl w-85 w-50-l">
               {this.renderAllPosts()}
             </section>
             <div className="pa2 fl w-20 db-l dn">
               <div onClick={()=>this.handleAddPost()} className="link green pointer">
                 <div className="bg-moon-gray h5 tc pv4">
                   <img src="https://cdn0.iconfinder.com/data/icons/iconico-3/1024/53.png" width="100px" alt='add-post'/>
                   <h2>Add Post</h2>
                 </div>
               </div>
             </div>
           </div>
           <div>
            <AddPostModal openModal={this.state.openModal} closeModal={this.closeModal} allCategory="all-category"/>
           </div>
         </div>

    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllPosts,
  }, dispatch)
}

function mapStateToProps(state) {
  const {hash} = state.router.location
  const { posts } = state
  return {
    hash,
    posts
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Home)
