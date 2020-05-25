import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { StylesProvider } from "@material-ui/core/styles"
import PollCard from "../components/PollCard"
import Grid from "@material-ui/core/Grid"
import getEventList from "../ApiCalls/getEventList"
import Fab from "@material-ui/core/Fab"
import RefreshIcon from "@material-ui/icons/Refresh"
import NetworkError from "../components/NetworkError"
import Container from "@material-ui/core/Container"
import Loading from "../components/Loading"
import LinearProgress from '@material-ui/core/LinearProgress';
import Footer from '../components/Footer'
import "./index.css"
import "../components/animations.css"
class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      msg: "",
      launched: false,
      polls: [],
      // noEvent:
      isRouting:false,
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
  showProgressbar = ()=>{
    this.setState({isRouting:true})
  }
  render() {
    if (this.state.loading === true) {
      return <Loading title="Polls" />
    }
    return (
     /*  <React.Fragment>
      <div className='main'> */
      <StylesProvider injectFirst>
       
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Polls</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container className='container'>
        {this.state.isRouting===true ?   <LinearProgress color="secondary" /> :null }
       
          <Grid container spacing={1} className='grid-item'>
            {this.state.polls.length > 0 ? (
              this.state.polls.map(item => {
                return (
                  <PollCard
                    className="fade-in"
                    key={item.id}
                    name={item.event_name}
                    showloading={this.showProgressbar}
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
            className="fab"
            onClick={() => this.refresList()}
          >
            <RefreshIcon />
          </Fab>
        </Container>
        <div className='space'>dddd</div>
        <Footer/>
      </StylesProvider>
    /*  
      </div> 
    </React.Fragment> */
    )
  }
}

export default IndexPage
