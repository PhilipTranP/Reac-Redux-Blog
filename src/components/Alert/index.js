import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { stopAlert } from '../../redux/Alert/actions'

class Alerts extends Component {
  render() {
    const style="ba br2 pa3 ma2 green bg-washed-green inline"
    return (
      <div className="fixed w-60 ph3 pv3 pv4-ns ph4-m ph5-l top-100" style={{zIndex: "100", right: "40px", textAlign: "left"}}>

        {this.props.alertData.map(a => (
          <div className="center w-70" key={Math.random()*10000}>
            <div className={style} >
               <div role="alert">
                 <svg className={`dib h2 w2 ${a.color} mr2`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={a.icon}></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>
                 
                {/*
                 <svg className="dib h2 w2 red mr2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points={alert.icon} ></polygon></svg>
                 */}
                  <h3 className='mt2 link red pointer pull-right' onClick={()=>this.props.stopAlert(a.id)}>X</h3>

                  <h3 className='ml5 black' style={{marginTop: '-25px'}}>{a.message} </h3>

               </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {alertData} = state
  return {
    alertData
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
   stopAlert
  }, dispatch)
}




export default connect(mapStateToProps, matchDispatchToProps)(Alerts)
