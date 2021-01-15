import React, {Component} from 'react';
import {View} from 'native-base';
import {TextInput, StyleSheet} from 'react-native';
import {Container, Header, Content, Form, Item} from 'native-base';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import sumbitVotes from '../ApiCalls/submitVotes';
import SuccessDialog from './SuccessDialog';
import otpVerification from '../ApiCalls/otpVerification'

class VoteAmount extends Component {
  constructor(props) {
    super(props)
    this.alertRef = React.createRef()
    this. state = {
      event_name: '',
      buttonText: 'Submit',
      loading: false,
      visible: false,
      phoneNumber: '',
      voucherCode: '',
      noOfVotes: '',
      ntwkType: 'MTN',
      contestantId: '',
      msg: '',
      disableInput: false,
      showDialog:false
    };
  }
  
 
  submitData = async () => { 
    if (this.state.ntwkType === null) {
      this.setState({
        msg: 'Please Select Network',
        visible: true,
      });
      return;
    }
    if (this.state.noOfVotes === '' || this.state.noOfVotes == 0) {
      this.setState({
        msg: 'Enter Number of Votes to cast',
        visible: true,
      });
      return;
    }
    if (this.state.phoneNumber.length !== 10) {
      this.setState({
        msg: 'Phone number must contain 10 digits',
        visible: true,
      });
      return;
    }
    this.setState({
      buttonText: '',
      loading: true,
      disableInput: true,
    });
    var response = await sumbitVotes(this.state);
    if (response === 'ok') {
      //  alert('insertion succesful')
      this.setState({
        loading: false,
        buttonText: 'Submit',
        disableInput: false,
    //    showDialog:true
      });
      
      this.alertRef.current._showDialog()
    } else {
      alert('An Error has occured, please try again');
      this.setState({
        loading: false,
        buttonText: 'Submit',
        disableInput: false,
      });
    }
    // alert('continuing')
  };

  submitOtp =async (otp) =>{
    this.setState({
      buttonText: '',
      loading: true,
    
    });
    var response = await otpVerification(otp)
    this.setState({
      loading: false,
      buttonText: 'Submit',
     
    });
    console.log(response)
    if (response.resp_code === 200) {
     
       alert(response.message)
        setTimeout(() => {
        this.props.navigation.navigate('Polls')
       }, 3000); 
    
    }
    else{
      //otp error
    
      alert(response.message)
    
    }
  }
  componentDidMount = () => {
    //  console.log('data is ',this.props.route.params.eventName)
    const eventName = this.props.route.params.eventName;
    const id = this.props.route.params.id;
    this.setState({
      event_name: eventName,
      contestantId: id,
    });
  };
  render() {
    return (
      <>
        <Content>
          <Form>
         <Item style={[styles.inputField]}> 
            <Input
              
              label={`Enter Number of Votes {GHS ${this.props.route.params.price} per vote}`}
              keyboardType="phone-pad"
              leftIcon={{ type: 'font-awesome', name: 'money' }}
              value={`${this.state.noOfVotes}`}
              disabled={this.state.disableInput}
              onChangeText={text =>
                this.setState({noOfVotes: Math.round(text)})
              }
              />
           
            </Item>
            <Text style={{textAlign: 'center'}}>
              Votes {this.state.noOfVotes} : GHS { (this.state.noOfVotes*this.props.route.params.price).toFixed(2)}
            </Text>
            <Text style={[styles.heading]}>Select Service Provider</Text>
            <RadioButton.Group
              color="red"
              onValueChange={value => this.setState({ntwkType: value})}
              value={this.state.ntwkType}>
              <Item onPress={() => this.setState({ntwkType: 'MTN'})}>
                <RadioButton
                  disabled={this.state.disableInput}
                  color="#D71182"
                  value="MTN"
                />
                <Text>MTN</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'VOD'})}>
                <RadioButton
                  disabled={this.state.disableInput}
                  color="#D71182"
                  value="VOD"
                />
                <Text>VODAFONE</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'AIR'})}>
                <RadioButton
                  disabled={this.state.disableInput}
                  color="#D71182"
                  value="AIR"
                />
                <Text>AIRTEL</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'TIG'})}>
                <RadioButton
                  disabled={this.state.disableInput}
                  color="#D71182"
                  value="TIG"
                />
                <Text>TIGO</Text>
              </Item>
            </RadioButton.Group>
            <Item style={[styles.inputField]}>
              <Input
                label="Enter Mobile Money Number"
                keyboardType="numeric"
                leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                value={this.state.phoneNumber}
                disabled={this.state.disableInput}
                onChangeText={text => this.setState({phoneNumber: text})}
              />
            </Item>
            <Item style={[styles.inputField]}>
             
            </Item>
            <Item style={[styles.listItem]}>
              <View style={[styles.submitBtn]}>
                <Button
                  mode="contained"
                  mode="contained"
                  color="#D71182"
                  disabled={this.state.disableInput}
                  loading={this.state.loading}
                  onPress={this.submitData}>
                  {this.state.buttonText}
                </Button>
              </View>
            </Item>
          </Form>
        </Content>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
            },
          }}>
          {this.state.msg}
        </Snackbar>
        <SuccessDialog ref={this.alertRef} otpcall={this.submitOtp} navigator={this.props.navigation}/>
      </>
    );
  }
}
const styles = StyleSheet.create({
  inputField: {
    marginTop: 40,
  },
  radioItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioView: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  submitBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // width: '100%',
    margin: 30,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // width: '100%',
  },
  btn: {
    width: 200,
  },
});

export default VoteAmount;
