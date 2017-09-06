import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import CancelIcon from 'react-icons/lib/md/cancel'
import './Modal.css'
import { editPost, getAllPosts, getCategoryPosts, selectPost, deletePost, refreshCatPage } from '../../redux/Post/actions'
import { startAlert } from '../../redux/Alert/actions'
import { trashIcon, thumbUpIcon } from '../../constants'




class EditModal extends Component {
  constructor(props){
    super(props)
    this.state={
      newTitle: null,
      newBody: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDeleteRefresh = this.handleDeleteRefresh.bind(this)
  }

 //https://github.com/facebook/react-native/issues/2286
  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  handleUpdate(event, category){
    event.preventDefault()
    let title
    let body
    const { newTitle, newBody } = this.state
    newTitle == null ? title = this.props.title : title = newTitle
    newBody == null ? body = this.props.body : body = newBody
    const newPost = {
     "title": title,
     "body": body
   }
   if(this.props.categoryFromUrl){
     this.props.editPost(this.props.postId, newPost)
     this.props.closeModal()
     this.props.getCategoryPosts(this.props.categoryFromUrl)
   }else{
     this.props.editPost(this.props.postId, newPost)
     this.props.closeModal()
     this.props.refreshHomePage()
   }
   this.props.startAlert("Nice update!", thumbUpIcon, "green")
 }

 handleDeleteRefresh() {
   if(this.props.categoryFromUrl){
     this.props.closeModal()
     this.props.refreshCatPage(this.props.categoryFromUrl, this.props.postId)
   }else{
     this.props.closeModal()
     this.props.refreshHomePage()
   }
   this.props.startAlert("The post was gone now.", trashIcon, "red")
 }

  render() {
    return (
      <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.props.openModal}
          onRequestClose={this.props.closeModal}
          contentLabel="Modal"
        >
            <main className="pa4 black-80">
              <form className="measure center" onSubmit={this.handleSubmit}>
              <fieldset className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Edit Post</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">Post Title</label>
                  <input autoFocus className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="newTitle" onChange={this.handleChange} defaultValue={this.props.title} />
                </div>
                <div className="mv3">
                  <label htmlFor="body" className="f6 b db mb2">Post Body</label>
                  <textarea id="newBody" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={this.handleChange} defaultValue={this.props.body} ></textarea>
                  <small id="body-desc" className="f6 black-60 db mb2">To delete the post please clear both form inputs first.</small>
                </div>

              </fieldset>
              {this.state.newTitle === '' && this.state.newBody === ''
                 ?
                   <div className="" onClick={(e) => {
                       e.preventDefault();
                       this.props.deletePost(this.props.postId);
                       this.handleDeleteRefresh()
                     }}>
                     <button className="link red b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="text">Delete Post</button>
                     </div>
                 : <div className="" onClick={this.handleUpdate}>
                      <button className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="text">Update Post</button>
                   </div>
               }
            </form>
            </main>
          <div className="close-modal-button">
            <span className="pointer" onClick={this.props.closeModal}><CancelIcon size={30} /></span>
          </div>
        </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {selectedPost} = state
  return {
    selectedPost
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPost,
    getAllPosts,
    editPost,
    deletePost,
    getCategoryPosts,
    refreshCatPage,
    startAlert
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(EditModal))
