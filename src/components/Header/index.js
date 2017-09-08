import React, { Component } from 'react'
import logo from './logo.svg';

export default class Header extends Component {
  render(){
    return(
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" /><span ><img src="https://s3.amazonaws.com/media-p.slid.es/uploads/345677/images/2756761/logo__3_.png" width="65px" style={{marginBottom: "10px"}} alt="header-logo"/></span>

        <h2 style={{paddingBottom: "20px"}}>Welcome to React-Redux Blog</h2>
      </div>
    )
  }
}
