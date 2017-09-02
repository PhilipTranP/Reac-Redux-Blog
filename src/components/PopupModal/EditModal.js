import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import CancelIcon from 'react-icons/lib/md/cancel'
import './Modal.css'
import { editPost, getCategoryPosts, selectPost, deletePost } from '../../redux/Post/actions'



class EditModal extends Component {
  constructor(props){
    super(props)
    this.state={
      newTitle: null,
      newBody: null
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteRefresh = this.handleDeleteRefresh.bind(this)
  }

  handleTitleChange(event) {
  this.setState({ newTitle: event.target.value });
  }
  handleBodyChange(event) {
  this.setState({ newBody: event.target.value });
  }

  handleSubmit(event, category){
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
   const urlCat = this.props.match.params.category
   this.props.editPost(this.props.postId, newPost)
   if(!urlCat){
     this.props.refreshHomePage()
     this.props.closeModal()
   }else{
     this.props.refreshCategoryPage(urlCat)
     this.props.closeModal()
   }
 }

 handleDeleteRefresh(){
   const urlCat = this.props.match.params.category
   if(!urlCat){
     this.props.refreshHomePage()
     this.props.closeModal()
   }else{
     this.props.refreshCategoryPage(urlCat)
     this.props.closeModal()
   }
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
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Edit Post</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">Post Title</label>
                  <input autoFocus className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="title" onChange={this.handleTitleChange} defaultValue={this.props.title} />
                </div>
                <div className="mv3">
                  <label htmlFor="body" className="f6 b db mb2">Post Body</label>
                  <textarea id="body" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={this.handleBodyChange} defaultValue={this.props.body} ></textarea>
                  <small id="body-desc" className="f6 black-60 db mb2">To delete the post please clear both form inputs first.</small>
                </div>

              </fieldset>
              {this.state.newTitle === '' && this.state.newBody === ''
                  ?
                    <div className="" onClick={(e) => {
                        e.preventDefault();
                        this.props.deletePost(this.props.postId);
                        this.handleDeleteRefresh()
                        this.props.alertDeleted()
                      }}>
                      <input className="link red b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="text" value="Delete Post" />
                      </div>
                  : <div className="">
                      <input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update Post" />
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
    editPost,
    deletePost,
    getCategoryPosts
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(EditModal))
