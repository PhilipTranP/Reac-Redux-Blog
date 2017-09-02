import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FaBeer, FaSmileO, FaHashtag, FaFlagO, FaFrownO } from 'react-icons/lib/fa'
import { MdFavoriteOutline, MdFavorite } from 'react-icons/lib/md'
import EditModal from '../PopupModal/EditModal'
import AlertContainer from 'react-alert'
import _ from 'lodash'
import './Highlight.css'
import { getAllPosts, votePost, selectPost } from '../../redux/Post/actions'


class Highlight extends Component {
  constructor(props) {
    super(props)
    this.state={
      openModal: false,
      responses: 273,
    }
    this.closeModal = this.closeModal.bind(this)
  }
  //Genenrate a random response just for the fun of it
  componentDidMount() {
    this.setState({responses: Math.floor(Math.random()*2000)})
  }

  closeModal() {
    this.setState({openModal: !this.state.openModal})
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }
  render() {
    const {post} = this.props
    return (
      <article className="mb3 ba b--black-10 bg-white tc pv2 flex flex-row flex-wrap items-center">
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="w-100 db flex flex-row flex-wrap items-top">
            <svg className="dib ml3 mb2" width={21} height={21} viewBox="0 0 21 21"><path d="M4.662 8.72l-1.23 1.23a1.753 1.753 0 0 0 .004 2.477l5.135 5.135c.7.693 1.8.688 2.48.005l1.23-1.23 5.35-5.346c.31-.31.54-.92.51-1.36l-.32-4.29c-.09-1.09-1.05-2.06-2.15-2.14l-4.3-.33c-.43-.03-1.05.2-1.36.51l-.79.8-2.27 2.28-2.28 2.27zm9.826-.98a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"fillRule="evenodd" /></svg>
            <Link to="/" className="underline-hover link f5 ph2 silver tl">Technology</Link>
          </div>
          <div className="w-100 db flex flex-row flex-wrap">
            <div className="tc dib ml2">
              <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h2 w2" alt="avatar" />
            </div>
            <div className="tl ml2 dib">
              <p className="mb0 mt2 f6 light-silver v-mid">
                <a className="link green pointer">{_.startCase(post.author)}</a> in <a className="link green pointer">{_.startCase(post.category)}</a></p>
              <p className="fw1 mb2 mt0 f6 light-silver v-mid"><a className="light-silver link dim" href>4 days ago</a> · 2 mins read</p>
            </div>
          </div>
          <div className="link f5 pa3 silver tl">
            <h3 className="mb3 f2 black-80 db w-100 tl">{post.title}</h3>
            <Link to={`${post.category}/${post.id}`} onClick={() => this.props.selectPost(post.id)}><img className="mw-100" src="https://cdn-images-1.medium.com/fit/t/800/240/1*gZUPu-r98Ma5aytXunR9qA.jpeg" alt=""/></Link>
             <div className="post-body">
                <span className="pointer mt2 pull-right" onClick={() => { this.props.selectPost(post.id); this.setState({openModal: true})}}>
                  <img src="https://cdn3.iconfinder.com/data/icons/social-productivity-line-art-5/128/history-edit-512.png" width="17px" height="17px" alt=""/></span>

                <p className="mb3 f4 black-80 db w-100 tl">{post.body}</p>
              </div>

            <Link to={`${post.category}/${post.id}`} onClick={() => this.props.selectPost(post.id)}><span className="link green f5">Read more...</span></Link>
            </div>
          <div className="ph3 w-100 flex flex-row flex-wrap justify-between content-between">
            <span className="silver flex flex-row flex-wrap items-center"><button className="outline-0 button-reset input-reset bg-transparent bn pointer ma0">
            <div className="mb1 mr2 heart">
              <div className="silver heart-outline"><MdFavoriteOutline size="22"/></div>
              <div className="heart-favorite link pointer" onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, {option: "upVote"}); this.setState({responses: this.state.responses + 1}) }}><MdFavorite size="22" color="red"/></div>
            </div>
          </button>{post.voteScore}</span>
        <span className=" pointer silver flex flex-row flex-wrap items-center"><a className="link dim f5 silver">{this.state.responses} Responses</a> <button className="outline-0 button-reset input-reset bg-transparent bn pointer ma0"><svg width={25} height={25} viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"fillRule="evenodd" /></svg></button><span style={{marginRight: "20px", marginTop: "-20px"}}>
              <div className="hide-child absolute pr3 mr5">
                <button className="outline-0 button-reset input-reset bg-transparent bn pointer ma0"><svg width={19} height={19} viewBox="0 0 19 19"><path d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z"fillRule="evenodd" /></svg></button>

                  <div className="child absolute link green pt2" style={{backgroundColor: '#FFF', marginLeft: "-132px", paddingLeft: "0px", textAlign: "right", width: "168px"}}>
                    <div style={{paddingRight: "20px"}}>
                      <div className="pb2 pointer" onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, {option: "upVote"});
                        this.msg.show('`cause you like it, I will write it more', {
                        time: 5000,
                        type: 'success',
                        icon: <MdFavorite size="24" color="red" />
                    }); this.setState({responses: this.state.responses + 1}) }}> Upvote <FaSmileO color="gold"/></div>
                      <div className="pb2 pointer" onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, {option: "downVote"});
                        this.msg.show('Lets have a beer. Maybe you will change your mind!', {
                          time: 5000,
                          type: 'success',
                          icon: <FaBeer size="24" color="gold" />
                       }); this.setState({responses: this.state.responses + 1}) }}> Imsad <FaFrownO color="#544444"/></div>
                      <div className="pb2 pointer" onClick={(e) => {
                        e.preventDefault(); this.setState({responses: this.state.responses + 1}); this.msg.show('Seems like we do need a flag here!')} }> Flag <FaFlagO  size={15} color="red"/></div>
                      <div className="pb2 pointer" onClick={(e) => {
                        e.preventDefault(); this.setState({responses: this.state.responses + 1}); this.msg.show('Tagging/Bookmarking is on the way...')} }> Tag <FaHashtag size={13} color="#0084b4"/></div>
                    </div>
                  </div>

            </div></span>
            </span>
          </div>
            <div>
              <EditModal openModal={this.state.openModal} closeModal={this.closeModal} postId={post.id} title={post.title} body={post.body} category={this.props.category} pathname={this.props.pathname} refreshHomePage={this.props.refreshHomePage} refreshCategoryPage={this.props.refreshCategoryPage}/>
            </div>
      </article>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost } = state
  const {pathname} = state.router.location
  return {
    pathname,
    selectedPost
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPost,
    getAllPosts,
    votePost
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Highlight)
