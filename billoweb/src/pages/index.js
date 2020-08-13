import React, { Component } from "react"

import Polls from './polls'
import "./user.css"


export class index extends Component {
  
 /*  componentDidMount(){
    //localStorage.clear()
    const user = localStorage.getItem('user')
    if(user !== null){
      console.log('there is a user ',user)
      navigate('/polls')
    }
    else{
      console.log('no user ',user)
    }
  } */
  componentDidMount(){
   // DrawGraph()
  }
  render() {
  
    return (
      <div className='page'>
        <Polls/>
        
      </div>
    )
  }
}

export default index
