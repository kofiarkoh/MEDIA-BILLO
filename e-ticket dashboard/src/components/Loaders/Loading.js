import React, { Component } from "react"

import "./loading.css"
class Loading extends Component {
  render() {
    return (
      
        <div className={`loading-content fade-in`}>
         

            {
                this.props.loading && <div className="loading-main">
                <div className="loading">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            }
          
        </div>
      
    )
  }
}

export default Loading
