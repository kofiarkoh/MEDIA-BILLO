 import React, { Component } from "react"
import { StylesProvider } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import { navigate } from "gatsby"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import "./user.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class User extends Component {

    state ={
        phone: '',
        open:false,
        otp:null
    }
    setPhoneNumber = (event)=>{
      
        this.setState({
            phone:event.target.value
        })
    }
    handleClose = ()=>{
      this.setState({
        open:false
      })
      navigate('/polls')
    }
    saveUser = ()=>{
      if(this.state.phone.length !== 10) {
        alert('10 digit phone number required');
        return
      }
      var userotp = this.generateOTP()
        localStorage.setItem('user',this.state.phone)
        localStorage.setItem('userotp',userotp)
        this.setState({
          open:true,
          otp:userotp
        })
     
    }
    generateOTP = ()=> { 
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    } 
  render() {
    return (
      <StylesProvider injectFirst>
        <div className="main">
            
          <div>

              <h3>MediaBillo Voting Portal</h3>
          <h5>Enter phone number to get your pin</h5>

            <Paper elevation={5} className="paper">
              <form noValidate className="formc" autoComplete="off">
                <TextField
                  className="form"
                  id="outlined-basic"
                  onChange={(event)=>this.setPhoneNumber(event)}
                  label="Phone number"
                  type="number"
                  variant="outlined"
                />
                <br />
                <Button onClick={this.saveUser} className='btn' variant="contained" color="primary">
                  Generate Pin
                </Button>
               {/*  <Button onClick={()=>{localStorage.clear()}} className='btn' variant="contained" color="primary">
                  reset
                </Button> */}
              </form>
            </Paper>
          </div>
        </div>
        <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        disableBackdropClick={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Thank you, your pin number is {this.state.otp}, Please keep this save
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={this.handleClose} color="primary">
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
      </StylesProvider>
    )
  }
}

export default User
