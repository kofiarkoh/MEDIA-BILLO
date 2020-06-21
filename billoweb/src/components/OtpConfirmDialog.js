import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import swal from "sweetalert"
import otpVerification from '../ApiCalls/otpVerification'
import {navigate} from 'gatsby'

export class OtpConfirmDialog extends Component {
constructor(props) {
    super(props)
    this.otpRef = React.createRef()
    this.state = {
         dialogopen : false,
         otp : ''
    }
    
}


setOtp = (event)=>{
    this.setState({
        otp:event.target.value
    })
}

showDialog=()=>{
    this.setState({
        dialogopen:true
    })
}


handleClose =() =>{
    this.setState({
        dialogopen:false
    })
  /*   if (this.verifyOtp()) {

    } */
}
verifyOtp = async ()=>{
  this.handleClose()
    const {otp} = this.state
    this.props.backdrop(true)
    if (otp.length === 0) {
      swal({
        text: "Enter a valid pin",
        icon: "warning",
      });
      this.props.backdrop(false)
      return
    }
    
    var response = await otpVerification(otp)
    if (response.resp_code === 200) {
      //otp success
      this.handleClose()
      swal({
         text: response.message,
         icon: "success",
       });
       setTimeout(() => {
        navigate('/')
       }, 3000);
    
    }
    else{
      //otp error
      swal({
         text: response.message,
         icon: "error",
       });
       //this.handleClose()
    }
    this.props.backdrop(false)
    
  }
    render() {
        return (
            <div ref={this.otpRef}>
            
            <Dialog open={this.state.dialogopen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">OTP CONFIRMATION</DialogTitle>
              <DialogContent>
                <DialogContentText>
                 Please enter your OTP which was sent to through sms
                </DialogContentText>
                <TextField
                  autoFocus
                  onChange={(event)=>{this.setOtp(event)}}
                  margin="dense"
                  id="name"
                  label="Enter otp here"
                  type="number"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
               
                <Button onClick={this.handleClose} >
                 Didn't get Pin? Retry.
                </Button>
                <Button onClick={this.verifyOtp} color="primary">
                  Verify
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }
}

export default OtpConfirmDialog

