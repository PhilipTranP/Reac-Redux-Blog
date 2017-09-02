import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import CancelIcon from 'react-icons/lib/md/cancel'
import './AddPostModal.css'


import { selectCategory } from '../../redux/Category/actions'
import { addPost } from '../../redux/Post/actions'


class PopupModal extends Component {
  constructor(props){
    super(props)
    this.state={
      author: '',
      title: '',
      body: '',
      option: ''
    }
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleAuthorChange(event) {
  this.setState({ author: event.target.value });
  }

  handleTitleChange(event) {
  this.setState({ title: event.target.value });
  }
  handleBodyChange(event) {
  this.setState({ body: event.target.value });
  }
  handleSubmit(event){
    event.preventDefault()
    let category
    if(this.props.allCategory==="all-category"){
      category = this.state.option
    } else {
      category = this.props.category
    }
    const post = {
     "id": Math.random().toString(36).substr(-8),
     "timestamp": Date.now(),
     "title": this.state.title,
     "body": this.state.body,
     "author": this.state.author,
     "category": category,
     "voteScore": 1,
     "deleted": false
   }
   this.props.addPost(post)
   this.props.closeModal()
  }
  handlePostSubmit(event){
    const post = {
      "id": "8xf0yjaabvfafaf3nafad",
      "timestamp": Date.now(),
      "title": "Udacity Redux Test1",
      "body": "Everyone says so after all.",
      "author": "Phil Tran",
      "category": "redux",
      "voteScore": 1,
      "deleted": false
    }
    this.props.addPost(post)
    this.props.closeModal()
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
                <legend className="f4 fw6 ph0 mh0">Add New Post {this.props.allCategory === "all-category" ? null : "To Category " + this.props.category.toUpperCase()}</legend>
                {this.props.allCategory === "all-category"
                  ?
                    <div className="mt3">
                            <label className="dib fw6 lh-copy f6" htmlFor="author">Select a Different Category</label>
                            <span className="ph2 fw6 lh-copy f6"><select value={this.props.category} onChange={(e) => {
                              e.preventDefault();
                              this.setState({option: e.target.value}); this.props.selectCategory(e.target.value)}}>
                              <option disabled defaultValue>Select one</option>
                              <option value="react">React</option>
                              <option value="redux">Redux</option>
                            </select></span>
                     </div>
                  :
                      null
                }

                <div className="mt3">
                  <label className="db fw6 lh-copy f6" for="author">Author Name</label>
                  <input autoFocus className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="author" onChange={this.handleAuthorChange} value={this.state.author} />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" for="title">Post Title</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"  id="title" onChange={this.handleTitleChange} value={this.state.title}/>
                </div>
                <div className="mv3">
                  <label for="body" className="f6 b db mb2">Post Body</label>
                  <textarea id="body" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" onChange={this.handleBodyChange} value={this.state.body}></textarea>
                </div>

              </fieldset>
              <div className="">
                <input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit Post" />
              </div>
            </form>
            </main>
          <div className="close-modal-button pointer">
            <a onClick={()=>this.props.closeModal()} style={{color: "green"}}><CancelIcon size={30} /></a>
          </div>
        </Modal>
    )
  }
}

function mapStateToProps(state) {
  const { category } = state
  const {hash} = state.router.location
  return {
    hash,
    category
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost,
    selectCategory
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PopupModal)
