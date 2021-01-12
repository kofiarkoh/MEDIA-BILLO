import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { StylesProvider } from "@material-ui/core/styles"
import Contestant from "../components/Contestant"
import Grid from "@material-ui/core/Grid"
import Fab from "@material-ui/core/Fab"
import RefreshIcon from "@material-ui/icons/Refresh"
import ArrorForward from "@material-ui/icons/ArrowForward"
import NetworkError from "../components/NetworkError"
import Container from "@material-ui/core/Container"
import getContestants from "../ApiCalls/getContestants"
import { navigate } from "gatsby"
import Footer from '../components/Footer'
import Loading from "../components/Loading"
import LinearProgress from '@material-ui/core/LinearProgress';
import swal from 'sweetalert'
import "./index.css"
class pickcontestant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contestants: [],
      loading: false,
      contestantId: null,
      isRouting:false,
      eventname:null // sessionStorage.getItem("eventname"),
    }
  }
  fetchContestants = async eventName => {
  await  this.setState({
      loading: true,
      eventname: sessionStorage.getItem("eventname"),
    })
    var data = await getContestants(sessionStorage.getItem("eventname"))
  //  console.log(data)
    this.setState({
      contestants: data,
      event_name: eventName,
      loading: false,
      openDialog: false,
    })
  }
  setContestant = id => {
    this.setState({
      contestantId: id,
    })
  }
  goToPayment = () => {
    if (this.state.contestantId === null) {
     
      swal({
       // title: "Selec",
        text: "Please choose a contestant to vote for",
        icon: "warning",
      });
      return
    }
    this.setState({
      isRouting:true,
      //openDialog: true,
    })
    sessionStorage.setItem("contestant", this.state.contestantId)
    navigate("/payment")
  }
  componentDidMount() {
    this.fetchContestants()
  }
  showProgressbar = ()=>{
    this.setState({isRouting:true})
  }

  render() {
    if (this.state.loading === true) {
      return <Loading title="Contestants" />
    }
    return (
      <StylesProvider injectFirst>
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Contestants</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {this.state.isRouting===true ?   <LinearProgress color="secondary" className='linear-progress' /> :null }

        <Container className='container'>
         {/*  {this.state.loading === true ? <h1>loading</h1> : null} */}
          
          <Grid container spacing={1} className="pollGridf">
            {this.state.contestants.length > 0 ? (
              this.state.contestants.map(item => {
               
                return (
                  <Contestant
                    key={item.id}
                    name={item.contestant_name}
                    id={item.id}
                    votes={item.votes}
                    imgurl={`${item.image_path}`}
                    click={this.setContestant}
                    showloading={this.showProgressbar}
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
            onClick={() => this.fetchContestants(this.state.eventname)}
          >
            <RefreshIcon />
          </Fab>
          <Fab
            aria-label="like"
            className="fab"
            onClick={() => this.goToPayment()}
          >
            <ArrorForward />
          </Fab> 

        </Container>
      
        <Footer/>
      
      </StylesProvider>
    )
  }
}

export default pickcontestant
