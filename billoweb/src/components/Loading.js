import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { StylesProvider } from "@material-ui/core/styles"
import "./loading.css"
class Loading extends Component {
  render() {
    return (
      <StylesProvider injectFirst>
        <div className={`loading-content fade-in`}>
          <AppBar position="static" className="appbar">
            <Toolbar>
              <Typography variant="h6">{this.props.title}</Typography>
            </Toolbar>
          </AppBar>

          <div className="loading-main">
            <div className="loading">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </StylesProvider>
    )
  }
}

export default Loading
