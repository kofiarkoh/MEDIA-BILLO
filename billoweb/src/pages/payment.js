import React, { Component } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Icon from "@material-ui/core/Icon"
import { StylesProvider } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { navigate } from "gatsby"
import "./index.css"
class payment extends Component {
  constructor(props) {
    super(props)

    this.state = {
        event_name: sessionStorage.getItem('eventname'),
        phoneNumber: '',
        voucherCode: '',
        noOfVotes: 0,
        ntwkType: 'MTN',
        contestantId: '',
    }
  }
  setValues = (field, event) => {
    //console.log(value)
    this.setState({
      [field]: event.target.value,
    })
  }
  submitData = () =>{
     var {noOfVotes,phoneNumber,voucherCode,ntwkType} = this.state
      if (noOfVotes === 0 || noOfVotes=== '' || noOfVotes===null) {
          alert('votes req')
          return

      }
      if (phoneNumber.length !== 10) {
          alert('10 digit phone number ')
          return
      }
      if ( ntwkType==="VOD" && voucherCode.length !== 6) {
          alert('6 digi')
          return
      }
      
      console.log(this.state)
  }
  render() {
    return (
      <StylesProvider injectFirst>
        <AppBar position="fixed" className="appbar">
          <Toolbar>
            <Typography variant="h6">Polls</Typography>
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
                helperText={`GHS ${ (this.state.noOfVotes*0.6).toFixed(2)} (GHS 0.6 per vote)`}
              />
            </Grid>
            <Grid item xs={12} sm={4} className="form">
              <FormControl component="fieldset">
                <FormLabel component="legend">
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
            <Grid item xs={12} sm={4} className="form">
              <TextField
                className="inputField"
                id="outlined-multiline-static"
                label="Voucher Code"
                type="number"
                variant="outlined"
               
                onChange={event => this.setValues("voucherCode", event)}
                helperText="Vodafone users only"
              />
            </Grid>
          </Grid>
          <div className='submit'>
            <Button variant="contained" 
            onClick={()=>this.submitData()}
           
            className='submitbtn' color="primary">
              Send
            </Button>
          </div>
        </Container>
      </StylesProvider>
    )
  }
}

export default payment
