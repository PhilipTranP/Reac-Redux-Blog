import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
  render(){
    return(
      <nav className="flex items-center justify-between flex-wrap flex-column bb b--black-10 bg-white db dt-l w-100 border-box ph3 pt3 ph6-l">
        <div className="w-100 mb3 flex items-center justify-between flex-wrap flex-row">
          <Link to="/" className="w2 ml5 v-mid mid-gray link tc tl-l mb2 mb0-l" title="Home">
            <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
          </Link>
          <div className="db dtc-l v-mid tc tr-l w4">
            <label id="search" className="flex items-center">
              <span className="dim pointer self-center">
                <svg className="self-center" width={25} height={25} viewBox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z" /></svg></span>
              <input className="ml2 outline-0 bn self-center" type="text" placeholder="Search blog..." />
            </label>
          </div>
        </div>
        <ul className="ml5 pl0 mt3 mb2 list mb1 w-75 flex items-start justify-start flex-wrap flex-row">
          {this.props.homeLink}
          { this.props.categoryLink }
          <li className="mr3"><a className="black-80 link dim pointer" href>About</a></li>
        </ul>
      </nav>
    )
  }
}
