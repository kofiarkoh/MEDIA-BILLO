import React, { Component } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { StylesProvider } from "@material-ui/core/styles"
import Contestant from "../components/Contestant"
import Grid from "@material-ui/core/Grid"
import getEventList from "../ApiCalls/getEventList"
import Fab from "@material-ui/core/Fab"
import RefreshIcon from "@material-ui/icons/Refresh"
import ArrorForward from "@material-ui/icons/ArrowForward"
import NetworkError from "../components/NetworkError"
import Container from "@material-ui/core/Container"
import getContestants from "../ApiCalls/getContestants"
import { navigate } from "gatsby"

import "./index.css"
class pickcontestant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contestants: [
        { name: "law", id: 4 },
        { name: "yaw", id: 42 },
        { name: "kofi", id: 43 },
      ],
      loading:false,
      contestantId: null,
      eventname:sessionStorage.getItem('eventname')
    }
  }
  fetchContestants = async eventName => {
      this.setState({
          loading:true
      })
    var data = await getContestants(eventName)
    console.log("ds", data)
    this.setState({
      contestants: data,
      event_name: eventName,
      loading: false,
    })
  }
  setContestant = id => {
    this.setState({
      contestantId: id,
    })
  }
  goToPayment= ()=>{
    if(this.state.contestantId === null) {
      alert("you mus ")
      return
    }
      navigate("/payment")
  }
  componentDidMount() {
    this.fetchContestants(this.state.eventname)
  }

  render() {
    console.log(this.props.location.state)
    return (
      <StylesProvider injectFirst>
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Polls</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container>
            {this.state.loading === true ? <h1>loading</h1> : null}
          <Grid container spacing={1} className="pollGridf">
            {this.state.contestants.length > 0 ? (
              this.state.contestants.map(item => {
                return (
                  <Contestant
                    key={item.id}
                    name={item.contestant_name}
                    id={item.id}
                    click={this.setContestant}
                    selected={
                      this.state.contestantId === item.id ? true : false
                    }
                  />
                )
              })
            ) : (
              <>
                <NetworkError />
              </>
            )}
          </Grid>
          <Fab
            aria-label="like"
            className="vote-fab"
            onClick={() =>
              this.fetchContestants(this.state.eventname)
            }
          >
            <RefreshIcon />
          </Fab>
          <Fab
            aria-label="like"
            className="fab"
            onClick={() =>
              this.goToPayment()
            }
          >
            <ArrorForward />
          </Fab>
        </Container>
      </StylesProvider>
    )
  }
}

export default pickcontestant
