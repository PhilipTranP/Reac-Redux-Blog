import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import './AddPostModal.css'

import { startAlert } from '../../redux/Alert/actions'
import { thumbUpIcon, alertTriangleIcon } from '../../constants'
import CancelIcon from 'react-icons/lib/md/cancel'


import { getAllCategories } from '../../redux/Category/actions'
import { addPost } from '../../redux/Post/actions'
import { postAuthorChange, postTitleChange, postBodyChange, postOptionChange, resetPostForm } from '../../redux/Post/actions'


class PopupModal extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
 }
  componentDidMount(){
    this.props.getAllCategories()
  }

  handleSubmit(event){
    event.preventDefault()
    let category
    if(!this.props.match.params.category){
      category = this.props.formValue.option
    } else {
      category = this.props.match.params.category
    }
    const { author, title, body } = this.props.formValue

    if(author === '' || title === '' || body === '') {
      this.props.startAlert("All fields are required", alertTriangleIcon, "red")
    } else {
      const post = {
       "id": Math.random().toString(36).substr(-8),
       "timestamp": Date.now(),
       "title": title,
       "body": body,
       "author": author,
       "category": category,
       "voteScore": 1,
       "deleted": false
     }
     this.props.addPost(post)
     this.props.resetPostForm()
     this.props.startAlert("Awesome! I will let everyone know", thumbUpIcon, 'green')

     this.props.closeModal()
    }
  }

  render() {
    const postCat = this.props.match.params.category
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
                <legend className="f4 fw6 ph0 mh0">Add New Post {postCat && this.props.match.params.category ? "To Category " + postCat.toUpperCase()  : null}</legend>
                {!postCat && !this.props.match.params.category
                  ?
                    <div className="mt3">
                            <label className="dib fw6 lh-copy f6" htmlFor="author">Select a Different Category</label>
                            <span className="ph2 fw6 lh-copy f6"><select value={this.props.formValue.option} onChange={(e) => {
                              this.props.postOptionChange(e.target.value)}}>
                              <option disabled defaultValue>Select one</option>
                              { this.props.categories.map(cat =>
                                <option key={ Math.random().toString(36).substr(-8)} value={cat.title} >{cat.title.toUpperCase()}</option>)
                              }
                            </select></span>
                     </div>
                  :
                      null
                }

                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="author">Author Name</label>
                  <input autoFocus className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="author" onChange={(e)=>{this.props.postAuthorChange(e.target.value)}} value={this.props.formValue.author} />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="title">Post Title</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="title" onChange={(e)=>{this.props.postTitleChange(e.target.value)}} value={this.props.formValue.title} />
                </div>
                <div className="mv3">
                  <label htmlFor="body" className="f6 b db mb2">Post Body</label>
                  <textarea id="body" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={(e)=>{this.props.postBodyChange(e.target.value)}} value={this.props.formValue.body}></textarea>
                </div>

              </fieldset>
              <div className="">
                <input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit Post" />
              </div>
            </form>
            </main>
          <div className="close-modal-button pointer">
            <a onClick={()=>{this.props.resetPostForm(); this.props.closeModal()}} style={{color: "green"}}><CancelIcon size={30} /></a>
          </div>
        </Modal>
    )
  }
}

function mapStateToProps(state) {
  const { categories, formValue } = state
  return {
    categories,
    formValue
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    postAuthorChange,
    postTitleChange,
    postBodyChange,
    postOptionChange,
    resetPostForm,
    getAllCategories,
    addPost,
    startAlert
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PopupModal))
