import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import startCase from 'lodash.startcase'
import moment from 'moment'
import { addComment, removeComment, upVoteComment, toggleEditForm, editComment,  getPostComments } from '../../redux/Comment/actions'
import { commentNameChange, commentBodyChange, resetCommentForm, showCommentForm } from '../../redux/Comment/actions'
import "./Comment.css"
//Testing feature showing two alerts
import { startAlert } from '../../redux/Alert/actions'
import AlertContainer from 'react-alert'

//Testing dif types of icons
import { FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'
import { thumbUpIcon, heartIcon, trashIcon, alertTriangleIcon } from '../../constants.js'
import { Trash2, Edit3 } from 'react-feather'

let upVotedList = []
let downVotedList = []
// let addedCommentList =[] //use to only allow owner to delete comment

class Comment extends Component {
  constructor(props){
    super(props)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleUpvoteComment = this.handleUpvoteComment.bind(this)
    this.handleDownVoteComment = this.handleDownVoteComment.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)
  }

  handleAddComment(e){
    e.preventDefault()
    const comment = {
    "id": Math.random().toString(36).substr(-8),
    "parentId": this.props.postId,
    "timestamp": Date.now(),
    "body": this.props.formData.body,
    "author": this.props.formData.name,
    "voteScore": 1,
    "deleted": false,
    "parentDeleted": false,
    }
    if(this.props.formData.name === "" || this.props.formData.body ===""){
      this.props.startAlert("All fields are required", alertTriangleIcon, 'red')
      this.props.showCommentForm(true)
    } else {
      this.props.addComment(comment)
      this.props.startAlert("Thanks for your comment", thumbUpIcon, 'green')
      this.props.resetCommentForm()
      this.props.showCommentForm(false)
    }
  }

  handleUpvoteComment(event, comment){
    event.preventDefault()
    const body = {
    "id": comment.id,
    "parentId": comment.parentId,
    "timestamp": comment.timestamp,
    "body": comment.body,
    "author": comment.author,
    "voteScore": comment.voteScore + 1,
    "deleted": false,
    "parentDeleted": false

    }
    if(upVotedList.indexOf(comment.id) === -1){
      this.props.upVoteComment(comment.id, body)
      upVotedList = upVotedList.concat(comment.id)
    } else {
      this.msg.show('You already upvoted this comment!')
    }
  }

  handleDownVoteComment(event, comment){
    event.preventDefault()
    const body = {
    "id": comment.id,
    "parentId": comment.parentId,
    "timestamp": comment.timestamp,
    "body": comment.body,
    "author": comment.author,
    "voteScore": comment.voteScore - 1,
    "deleted": false,
    "parentDeleted": false

    }
    if(downVotedList.indexOf(comment.id) === -1){
      this.props.upVoteComment(comment.id, body)
      downVotedList = upVotedList.concat(comment.id)
    } else {
      this.msg.show('You already downvoted this comment!')
    }
  }

  handleEditComment(e, id, oldValue, newValue) {
    e.preventDefault()
    if(newValue ==='' || oldValue === newValue.trim()) { //if hit submit without   //modify value
      this.props.startAlert("Please change something or cancel edit form", alertTriangleIcon, 'red')
    }else{
      const body = {
        timestamp: Date.now(),
        body: newValue
      }
      this.props.editComment(id, body)
      this.props.resetCommentForm()
      this.props.toggleEditForm(id)
      this.props.startAlert("Nice update!", thumbUpIcon, 'green')
    }
  }



  render() {
    const arrayMesage = ['Glad you like it', 'Thanks for showing your love', 'Wow, thats great!', 'Great! I will write more like this.']
    const message = arrayMesage[Math.floor(Math.random() * arrayMesage.length)]

    const renderCommentList = this.props.comments.map(comment => {
      return(
            <li key={comment.id}>
              <div className="comment-main-level">
                {/* Avatar */}
                <div className="comment-avatar" style={{backgroundColor: 'grey'}}><img src="/icon.png" alt="default-avatar"/></div>
                {/* Contenedor del Comentario */}
                <div className="comment-box">
                  <div className="comment-head">
                    <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{startCase(comment.author)}</a></h6>
                    <span>{moment(comment.timestamp).fromNow()}</span>
                    {/*heart icon for upvote comment */}
                    <a className="link pointer"   onClick={(event)=>this.handleDownVoteComment(event, comment)}>
                      <div className="mb1 heart pull-right">
                        <div className="silver heart-outline"><FaThumbsODown size="22"/></div>
                        <div className="heart-favorite link pointer" onClick={(e) => {e.preventDefault(); this.props.startAlert("Thanks for letting us know", alertTriangleIcon, 'gold')
                        }}><FaThumbsODown size="22" color="red"/></div>
                      </div>
                     </a>

                     <a className="link pointer"   onClick={(event)=>this.handleUpvoteComment(event, comment)}>
                       <div className="mb1 heart pull-right">
                         <div className="silver heart-outline"><FaThumbsOUp size="22"/></div>
                         <div className="heart-favorite link pointer" onClick={(e) => {e.preventDefault(); this.props.startAlert(message, heartIcon, 'red')
                         }}><FaThumbsOUp size="22" color="green"/></div>
                       </div>
                      </a>

                    <div className="silver pull-right" style={{marginRight: "0px", marginTop: "5px"}}>vote score {' '} <strong>{comment.voteScore}</strong></div>
                   {/* Reply Comment Button.

                     <img className="pull-right" src="https://d30y9cdsu7xlg0.cloudfront.net/png/390622-200.png" width="20px" alt=""/>*/}
                    <i className="fa fa-reply" />
                    <i className="fa fa-heart" />
                  </div>
                  <div className="comment-content">
                    {comment.body}

                    {/* Show hide edit form */}
                    { comment.isEditing
                      ?
                          <span className="pull-right link pointer"><a onClick={(event) => { event.preventDefault(); this.props.toggleEditForm(comment.id)} }><img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png" width="20px" height="20px" alt=""/></a></span>
                      :
                          null
                    }
                  </div>

                  {comment.isEditing === false || !comment.isEditing
                    ?
                      <div><div className="pt2 comment-content"></div>
                        <div style={{height: '5px'}}></div>
                          {/* TODO: Only the creator of the comment can delete it!  */}
                          <span className="pull-right link pointer silver" style={{marginRight: '10px'}}><a onClick={(e) => {e.preventDefault(); this.props.removeComment(comment.id);  this.props.startAlert("The comment is gone now", trashIcon, 'red');
                          this.props.getPostComments(comment.parentId)}}>
                          <Trash2 size="18" color="grey"/>
                          </a></span>


                         {/*Toggle the comment edit form*/}
                         <span className="pull-right link pointer silver" style={{marginRight: '10px'}}><a onClick={(event) => { event.preventDefault(); this.props.toggleEditForm(comment.id)} }>
                           <div style={{height: '2px'}}></div>
                           <Edit3 size="18" color="grey"/></a></span>
                      </div>
                    :
                       <div className="comment-content">

                             <textarea autoFocus id="comment" name="comment" className="mt1 pa1 input-reset ba bg--transparent w-100 measure" aria-describedby="comment-desc" placeholder="Comment" defaultValue={comment.body}  onChange={(e)=>{this.props.commentBodyChange(e.target.value)}}></textarea>

                             <div className="mt3" onClick={(event)=>this.handleEditComment(event, comment.id, comment.body, this.props.formData.body)}><input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Update" /></div>

                        </div>
                  }

                </div>
              </div>

             {/* TODO: Reply to a comment */}

            </li>
      )
    })
    return (
        <div className="comments-container">
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <h1 style={{marginLeft: '-30px'}}>{this.props.comments.length} Comments <span onClick={(e) => {this.props.showCommentForm(true)}}><a><span className="mr2 link pointer"><img src="http://cdn.onlinewebfonts.com/svg/img_168491.svg" width="20px" alt=""/>
            </span><span className="link green">Add Comment </span></a></span>

          <span className="pull-right"><a className="ml2 pt3 link green">Read Commenting Guidelines</a></span>

            </h1>
            {this.props.formData.formOpen === true
              ?
                <div>
                  <article className="pa4 black-80">
                      <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                          <div className="mt3">
                            <input autoFocus className="pa2 input-reset ba bg--transparent w-100 measure" type="email" name="email-address"  id="email-address" placeholder="Your name" value={this.props.formData.name} onChange={(e) => {e.preventDefault(); this.props.commentNameChange(e.target.value)}} />

                          </div>
                          <div>
                            <textarea id="comment" name="comment" className="mt3 pa2 input-reset ba bg--transparent w-100 measure" aria-describedby="comment-desc" placeholder="Comment" value={this.props.formData.body} onChange={(e) => {e.preventDefault(); this.props.commentBodyChange(e.target.value) }}></textarea>
                          </div>
                          <div className="flex items-center justify-center pa4">
                            <div  onClick={()=> {this.props.showCommentForm(false); this.props.resetCommentForm()}}><input className="f5 no-underline grey bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4" type="submit" value="Cancel" /></div>
                            <div onClick={this.handleAddComment}><input className="f5 no-underline green bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4" type="submit" value="Submit" /></div>
                          </div>
                      </form>
                   </article>
                </div>
              : null
            }
           <div style={{marginBottom:"150px"}}>
             <ul id="comments-list" className="comments-list">
              { renderCommentList }
             </ul>
           </div>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addComment,
    removeComment,
    upVoteComment,
    toggleEditForm,
    editComment,
    getPostComments,
    startAlert,
    commentNameChange,
    commentBodyChange,
    resetCommentForm,
    showCommentForm
  }, dispatch)
}
function mapStateToProps (state, ownProps){
  const { formData } = state
  return {
    postId: ownProps.postId,
    formData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
