import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdFavoriteOutline, MdFavorite } from 'react-icons/lib/md'
import "./Comment.css"
import AlertContainer from 'react-alert'
import { addComment, removeComment, upVoteComment, toggleEditForm, editComment,  getPostComments } from '../../redux/Comment/actions'

let upVotedList = []
// let addedCommentList =[] //use to only allow owner to delete comment

class Comment extends Component {
  constructor(props){
    super(props)
    this.state={
      showCommentForm: false,
      postId: '',
      name: '',
      body: '',
      commentBody:''
    }
    this.handleCommentClick = this.handleCommentClick.bind(this)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleUpvoteComment = this.handleUpvoteComment.bind(this)
    // this.handleRemoveComment = this.handleRemoveComment.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)
    this.onEditCommentChange = this.onEditCommentChange.bind(this)
  }

  handleCommentClick(e){ //show hide add comment form
    e.preventDefault()
    this.setState({showCommentForm: !this.state.showCommentForm})
  }
  handleNameChange(e){
    this.setState({name: e.target.value})
  }
  handleBodyChange(e){
    this.setState({body: e.target.value})
  }
  onEditCommentChange(e){
    this.setState({commentBody: e.target.value})
  }
  handleAddComment(e){
    e.preventDefault()
    const comment = {
    "id": Math.random().toString(36).substr(-8),
    "parentId": this.props.postId,
    "timestamp": Date.now(),
    "body": this.state.body,
    "author": this.state.name,
    "voteScore": 1,
    "deleted": false,
    "parentDeleted": false,
    }
    this.props.addComment(comment)
    this.setState({showCommentForm: !this.state.showCommentForm, name: '', body:''})
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

  handleEditComment(e, id, oldValue, newValue) {
    e.preventDefault()
    let bodyContent
    if(!newValue && newValue ==='') { //if hit submit without modify value
      bodyContent = oldValue
    }else{
      bodyContent = newValue
    }
    const body = {
      timestamp: Date.now(),
      body: bodyContent
    }
    this.props.editComment(id, body)
    this.props.toggleEditForm(id)
  }


  alertOptions = { // Alert when vote more than one time per comment
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }

  render() {
    const renderCommentList = this.props.comments.map(comment => {
      return(
            <li key={comment.id}>
              <div className="comment-main-level">
                {/* Avatar */}
                <div className="comment-avatar" style={{backgroundColor: 'grey'}}><img src="/icon.png" alt="default-avatar"/></div>
                {/* Contenedor del Comentario */}
                <div className="comment-box">
                  <div className="comment-head">
                    <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{_.startCase(comment.author)}</a></h6>
                    <span>{moment(comment.timestamp).fromNow()}</span>
                    {/*heart icon for upvote comment */}
                    <a className="link pointer"   onClick={(event)=>this.handleUpvoteComment(event, comment)}>
                      <div className="mb1 mr2 heart pull-right">
                        <div className="silver heart-outline"><MdFavoriteOutline size="22"/></div>
                        <div className="heart-favorite link pointer" onClick={(e) => {e.preventDefault(); }}><MdFavorite size="22" color="red"/></div>
                      </div>
                     </a>

                    <div className="pull-right" style={{marginRight: "-20px", marginTop: "2px"}}>{comment.voteScore}</div>
                    <img className="pull-right" src="https://d30y9cdsu7xlg0.cloudfront.net/png/390622-200.png" width="20px" alt=""/><span></span>
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
                          <span className="pull-right link pointer" style={{marginRight: '10px'}}><a onClick={(e) => {e.preventDefault(); this.props.removeComment(comment.id);
                          this.props.getPostComments(comment.parentId)}}><img src="https://maxcdn.icons8.com/Share/icon/Editing//delete1600.png" width="20px" height="20px" alt=""/></a></span>


                         {/*Toggle the comment edit form*/}
                         <span className="pull-right link pointer" style={{marginRight: '10px'}}><a onClick={(event) => { event.preventDefault(); this.props.toggleEditForm(comment.id)} }>
                           <div style={{height: '2px'}}></div>
                           <img src="https://cdn3.iconfinder.com/data/icons/social-productivity-line-art-5/128/history-edit-512.png" width="17px" height="17px" alt=""/></a></span>
                      </div>
                    :
                       <div className="comment-content">
                             <textarea autoFocus id="comment" name="comment" className="mt1 pa1 input-reset ba bg--transparent w-100 measure" aria-describedby="comment-desc" placeholder="Comment" defaultValue={comment.body}  onChange={this.onEditCommentChange}></textarea>
                             <div className="mt3" onClick={(event)=>this.handleEditComment(event, comment.id, comment.body, this.state.commentBody)}><input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Submit" /></div>
                        </div>

                  }
                </div>
              </div>

             {/* TODO: Reply to a comment */}
              <ul className="comments-list reply-list">
                <li>
                  {/* Avatar */}
                  <div className="comment-avatar" style={{backgroundColor: '#777'}}><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>

                  <div className="comment-box">
                    <div className="comment-head">
                      <h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                      <span>hace 10 minutos</span>
                        <img className="pull-right" src="http://iconshow.me/media/images/ui/ios7-icons/png/512/heart-outline.png" width="20px" alt=""/>
                        <img className="pull-right" src="https://d30y9cdsu7xlg0.cloudfront.net/png/390622-200.png" width="20px" alt=""/>
                      <i className="fa fa-reply" />
                      <i className="fa fa-heart" />
                    </div>
                    <div className="comment-content">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>
                  </div>
                </li>
                <li>
                  {/* Avatar */}
                  <div className="comment-avatar"><img src="/icon.png" alt=""/></div>

                  <div className="comment-box">
                    <div className="comment-head">
                      <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{_.startCase(comment.author)}</a></h6>
                      <span>hace 10 minutos</span>
                        <img className="pull-right" src="http://iconshow.me/media/images/ui/ios7-icons/png/512/heart-outline.png" width="20px" alt=""/>
                        <img className="pull-right" src="https://d30y9cdsu7xlg0.cloudfront.net/png/390622-200.png" width="20px" alt=""/>
                      <i className="fa fa-reply" />
                      <i className="fa fa-heart" />
                    </div>
                    <div className="comment-content">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>
                  </div>
                </li>
              </ul>
            </li>
      )
    })
    return (
        <div className="comments-container">
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <h1 style={{marginLeft: '-30px'}}>{this.props.comments.length} Comments <span onClick={this.handleCommentClick}><a><span className="mr2 link pointer"><img src="http://cdn.onlinewebfonts.com/svg/img_168491.svg" width="20px" alt=""/>
            </span><span className="link green">Add Comment </span></a></span>

          <span className="pull-right"><a className="ml2 pt3 link green">Read Commenting Guidelines</a></span>

            </h1>
            {this.state.showCommentForm
              ?
                <div>
                  <article class="pa4 black-80">
                      <form action="sign-up_submit" method="get" accept-charset="utf-8">
                          <div class="mt3">
                            <input autoFocus className="pa2 input-reset ba bg--transparent w-100 measure" type="email" name="email-address"  id="email-address" placeholder="Your name" value={this.state.name} onChange={this.handleNameChange}/>
                          </div>
                          <div>
                            <textarea id="comment" name="comment" className="mt3 pa2 input-reset ba bg--transparent w-100 measure" aria-describedby="comment-desc" placeholder="Comment" value={this.state.body} onChange={this.handleBodyChange}></textarea>
                          </div>
                        <div className="mt3" onClick={this.handleAddComment}><input className="link green b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Submit" /></div>
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
    getPostComments
  }, dispatch)
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
