import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CancelIcon from 'react-icons/lib/md/cancel'
import './Modal.css'
import { editPost, getCategoryPosts, selectPost } from '../../redux/Post/actions'
import AlertContainer from 'react-alert'


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
   if(newTitle === '' || newBody === ''){
     this.msg.show('You seems run out of word?')
   } else {
     this.props.editPost(this.props.postId, newPost)
     if(!this.props.category){ //check if request is from a home page
       this.props.refreshHomePage()
       this.props.closeModal()
     } else {
       this.props.refreshCategoryPage(this.props.category)
       this.props.closeModal()
     }
   }
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
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
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <legend className="f4 fw6 ph0 mh0">Edit Post</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">Post Title</label>
                  <input autoFocus className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="title" onChange={this.handleTitleChange} defaultValue={this.props.title} />
                </div>
                <div className="mv3">
                  <label htmlFor="body" className="f6 b db mb2">Post Body</label>
                  <textarea id="body" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={this.handleBodyChange} defaultValue={this.props.body} ></textarea>
                </div>

              </fieldset>
              <div className="">
                <input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Update Post" />
              </div>
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
    getCategoryPosts
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditModal)
