import React from "react"
import { Link } from "gatsby"

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
import PollCard from "../components/PollCard"
import Grid from "@material-ui/core/Grid"
import getEventList from "../ApiCalls/getEventList"
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';
import NetworkError from '../components/NetworkError'
import Container from '@material-ui/core/Container';
import "./index.css"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      msg: "",
      launched: false,
      polls: [],
      // noEvent:
      loading: false,
    }
  }
  refresList = async () => {
    this.setState({ loading: true })
    var data = await getEventList()
    var response = data
    console.log("datais ", data)
    // alert(response)
    if (response == null) {
      this.setState({
        msg: "Error Fetching Events Datads",
        visible: true,
        polls: null,
        loading: false,
      })
      return
    } else {
      this.setState({
        polls: response,
       loading: false,
      })
    }
  }
  componentDidMount() {
 
    this.refresList()
  }

  render() {
    if(this.state.loading === true) {
      return (
        <StylesProvider injectFirst>
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6">Polls</Typography>
          </Toolbar>
        </AppBar>
        <h1>loading</h1>
        </StylesProvider>
      )
    }
    return (
      <StylesProvider injectFirst>
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Polls</Typography>
          </Toolbar>
         
        </AppBar>
        <Toolbar/>
        <Container>
          
        <Grid container spacing={1} className="pollGridf">
      
          {this.state.polls.length > 0 ? (
            this.state.polls.map(item => {
              return <PollCard key={item.id} name={item.event_name} />
            })
          ) : (
            <>
            <NetworkError/>
           
            </>
          )}
        </Grid>
        <Fab  aria-label="like" className='fab' onClick={()=>this.refresList()}>
        <RefreshIcon />
      </Fab>
      </Container>
      </StylesProvider>
    )
  }
}

export default IndexPage
