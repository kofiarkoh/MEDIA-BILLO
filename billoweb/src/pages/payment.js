import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { StylesProvider } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import submitVotes from "../ApiCalls/submitVotes"
import { navigate } from "gatsby"

import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import Footer from "../components/Footer"
import swal from "sweetalert"
import "./index.css"
import "../components/animations.css"
import OtpConfirmDialog from "../components/OtpConfirmDialog"
class payment extends Component {
  constructor(props) {
    super(props)
    this.otpRef = React.createRef()
    this.state = {
      event_name: null, // sessionStorage.getItem('eventname'),
      phoneNumber: "",
      voucherCode: "",
      noOfVotes: 0,
      ntwkType: null,
      contestantId: null, //sessionStorage.getItem('contestant'),
      openSnackbar: false,
      message: "",
      openbackdrop: false,
    }
  }
  componentDidMount() {
    this.setState({
      event_name: sessionStorage.getItem("eventname"),
      contestantId: sessionStorage.getItem("contestant"),
    })
  }
  setValues = (field, event) => {
    //console.log(value)
    this.setState({
      [field]: event.target.value,
    })
  }
  
  submitData = async () => {
    var {
      noOfVotes,
      phoneNumber,
      voucherCode,
      ntwkType,
      contestantId,
      event_name,
    } = this.state
    if (noOfVotes === 0 || noOfVotes === "" || noOfVotes === null) {
      swal({
        icon: "warning",
        text: "Provide number of votes to cast",
      })
      return
    }
    if (ntwkType === null) {
      swal({
        icon: "warning",
        text: "Please select your service provider",
      })
      return
    }
    if (phoneNumber.length !== 10) {
      swal({
        icon: "warning",
        text: "10 digit phone number required "+phoneNumber.length,
      })
      return
    }

   /*  if (ntwkType === "VOD" && voucherCode.length !== 6) {
      swal({
        icon: "warning",
        text: "6 digit voucher pin required",
      })
      return
    } */
    if (contestantId === null || event_name === null) {
      swal({
        icon: "warning",
        text: "Event Name and Contest missing, please start over",
      })
      return
    }
    this.setState({
      openbackdrop: true,
    })
    //verify otp
  //  var otpStatus = await this.otpRef.current.showDialog()
   
   /*  if (otpStatus === 'invalid') {
      this.setState({
        openbackdrop :false
      })
      return
    }
    else{ */
 
  //}
  this.sendVoteData()
   
  }

  confirmOtp = async()=>{
    //verify otp
   var otpStatus = await this.otpRef.current.showDialog()
  

  }

  backdropHandler = (option)=> {
    this.setState({
      openbackdrop:option
    })
  }
  sendVoteData = async ()=> {
    
    
    var response = await submitVotes(this.state)
    if (response === "ok") {
      this.confirmOtp()
      /* if (ntwkType === "MTN") {
        swal({
          icon: "warning",
          text:
            "Thanks for voting, please wait for prompt on your phone to complete payment, if promp deleys,Dial *170#, My Account -> My Approvals ",
        }).then(()=>{
        //  this.goToHome()
        })
       
      } else {
        swal({
          icon: "warning",
          text:
            "Thanks for voting, please wait for prompt on your phone to complete payment",
        }).then(()=>{
          //this.goToHome()
        })
      } */
    } else {
      swal({
        icon: "error",
        text: "An error occured, Please try again",
      })
    }
    this.setState({
      openbackdrop: false,
    })
  }

  goToHome =()=>{
      navigate('/')
  }
  render() {
    return (
      <StylesProvider injectFirst>
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Payment</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container style={{ margin: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} className="form">
              <TextField
                className="inputField"
                id="outlined-multiline-static"
                label="Votes to cast"
                type="number"
                variant="outlined"
                onChange={event => this.setValues("noOfVotes", event)}
                helperText={`GHS ${(this.state.noOfVotes * 0.4).toFixed(
                  2
                )} (GHS 0.4 per vote)`}
              />
            </Grid>
            <Grid item xs={12} sm={4} className="form">
              <FormControl component="fieldset">
                <FormLabel component="legend" className="radioHeading">
                  Select Service Provider
                </FormLabel>
                <RadioGroup
                  aria-label="network"
                  name="network1"
                  value={this.state.network}
                  onChange={value => this.setValues("ntwkType", value)}
                >
                  <FormControlLabel
                    value="MTN"
                    control={<Radio />}
                    label="MTN"
                  />
                  <FormControlLabel
                    value="VOD"
                    control={<Radio />}
                    label="VODAFONE"
                  />
                  <FormControlLabel
                    value="AIR"
                    control={<Radio />}
                    label="AIRTEL"
                  />
                  <FormControlLabel
                    value="TIG"
                    control={<Radio />}
                    label="TIGO"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} className="form">
              <TextField
                className="inputField"
                id="outlined-multiline-static"
                label="Phone Number"
                type="number"
                variant="outlined"
                onChange={event => this.setValues("phoneNumber", event)}
              />
            </Grid>
           {/*  <Grid item xs={12} sm={4} className="form fade-in">
              <TextField
                className="inputField puff-in-center"
                id="outlined-multiline-static"
                label="Voucher Code"
                type="number"
                variant="outlined"
                style={{
                  display: this.state.ntwkType === "VOD" ? "inline" : "none",
                }}
                onChange={event => this.setValues("voucherCode", event)}
                helperText="Vodafone users only"
              />
            </Grid> */}

          </Grid>
          
          <div className="submit">
          <OtpConfirmDialog ref={this.otpRef} backdrop={this.backdropHandler} submitdata={this.sendVoteData}/>

            <Button
              variant="contained"
              onClick={() => this.submitData()}
              className="submitbtn"
              color="primary"
            >
              Send
            </Button>
          </div>
          <Backdrop open={this.state.openbackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
        <Footer />
      </StylesProvider>
    )
  }
}

export default payment
