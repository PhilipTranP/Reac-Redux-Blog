import React, { Component } from 'react'

export default class ReplyComment extends Component {
  render() {
    return(
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
    )
  }
}
