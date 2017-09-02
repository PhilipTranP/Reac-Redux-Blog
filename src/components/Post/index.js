import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import './Post.css'
import Comment from '../Comment'

import { selectPost } from '../../redux/Post/actions'
import { getPostComments } from '../../redux/Comment/actions'

class Post extends Component {
  componentDidMount() { // To load the post when refresh the browser
    const url = this.props.pathname
    const postId = url.substr(url.lastIndexOf('/') + 1) //extract id from pathname
    this.props.selectPost(postId)
    this.props.getPostComments(postId)
  }
  render() {
    const {selectedPost} = this.props
    console.log(this.props.match.params)
    return(
      <div>
       <section className="banner">
         <div className="img-bg">
           <div className="img-src" style={{backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/6957/night-shoot.jpg")'}} />
           <div className="img-src img-blurred" style={{backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/6957/night-shoot-blur.jpg")'}} />
           <div className="img-bg-content">
             <div className="content">
               <h1 className="title">{selectedPost.title}</h1>
               <p className="byline">{selectedPost.body}</p>
               <p className="more"><a href="about.html"><span className="gravatar"><img src="https://secure.gravatar.com/avatar/8d6e9c07171508fa435faa35ae8a0ebc?s=64" alt="avatar"/></span> <span className="link green">{_.startCase(selectedPost.author)} </span> in <span className="link green">{_.startCase(selectedPost.category)}</span></a></p>
             </div>
           </div>
         </div>
       </section>
       <section className="post">
         <div className="content" style={{textAlign: "left", width: "760px"}}>
            <p className="pull-right"><img src="https://source.unsplash.com/random/" alt="kitteh"  width="300px"/></p>
           <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
            <p className="pull-left"><img src="https://source.unsplash.com/random/" alt="kitteh"  width="300px"/></p>
           <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
           <p className="pull-right"><img src="https://source.unsplash.com/random/" alt="kitteh"  width="300px"/></p>
           <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy.</p>
           <p>The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her.</p>
         </div>
       </section>
       <Comment comments={this.props.postComments} removeComment={this.props.removeComment} getPostComments={this.props.getPostComments} addComment={this.props.addComment} postId={selectedPost.id}/>
     </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPost,
    getPostComments
  }, dispatch)
}
function mapStateToProps(state, ownProps) {
  const { selectedPost, postComments, posts } = state
  const { pathname } = state.router.location
  return {
    // path: ownProps.route ? ownProps.route.path : "/",
    selectedPost,
    postComments,
    posts,
    pathname
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
