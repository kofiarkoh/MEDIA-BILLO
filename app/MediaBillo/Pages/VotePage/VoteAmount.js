import React, {Component} from 'react';
import {View} from 'native-base';
import {TextInput, StyleSheet} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import sumbitVotes from '../ApiCalls/submitVotes';
import userAssistance from './userAssistance';
class VoteAmount extends Component {
  state = {
    event_name: '',
    buttonText: 'Submit',
    loading: false,
    visible: false,
    phoneNumber: '',
    voucherCode: '',
    noOfVotes: 0,
    ntwkType: 'MTN',
    contestantId: '',
    msg: '',
  };
  submitData = async () => {
    console.log('called' + this.state.phoneNumber.length);
    if (
      this.state.ntwkType === 'VOD' &&
      (this.state.voucherCode === '' || this.state.voucherCode.length != 6)
    ) {
      this.setState({
        msg: '6 digit voucher code required',
        visible: true,
      });
      return;
    }
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
    });
    var response = await sumbitVotes(this.state);
    if (response === 'ok') {
      //  alert('insertion succesful')
      this.setState({
        loading: false,
        buttonText: 'Submit',
      });
      userAssistance();
    } else {
      alert('An Error has occured, please try again');
      this.setState({
        loading: false,
        buttonText: 'Submit',
      });
    }
    // alert('continuing')
  };
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
                placeholder="Enter Number of Votes to Cast"
                keyboardType="phone-pad"
                value={`${this.state.noOfVotes}`}
                onChangeText={text => this.setState({noOfVotes: Math.round(text)})}
              />
             
            </Item>
            <Text style={{textAlign:'center'}}>
               
                Votes  {this.state.noOfVotes} : GHS {this.state.noOfVotes*0.6}
              </Text>
            <Text style={[styles.heading]}>Select Network to Pay With</Text>
            <RadioButton.Group
              color="red"
              onValueChange={value => this.setState({ntwkType: value})}
              value={this.state.ntwkType}>
              <Item onPress={() => this.setState({ntwkType: 'MTN'})}>
                <RadioButton color="#D71182" value="MTN" />
                <Text>MTN</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'VOD'})}>
                <RadioButton color="#D71182" value="VOD" />
                <Text>VODAFONE</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'AIR'})}>
                <RadioButton color="#D71182" value="AIR" />
                <Text>AIRTEL</Text>
              </Item>
              <Item onPress={() => this.setState({ntwkType: 'TIG'})}>
                <RadioButton color="#D71182" value="TIG" />
                <Text>TIGO</Text>
              </Item>
            </RadioButton.Group>
            <Item style={[styles.inputField]}>
              <Input
                placeholder="Enter Mobile Money Number"
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({phoneNumber: text})}
              />
            </Item>
            <Item style={[styles.inputField]}>
              <Input
                disabled={this.state.ntwkType == 'VOD' ? false : true}
                placeholder="Voucher Code (Vodafone Users Only)"
                keyboardType="numeric"
                value={this.state.voucherCode}
                onChangeText={text => this.setState({voucherCode: text})}
              />
            </Item>
            <Item style={[styles.listItem]}>
              <View style={[styles.submitBtn]}>
                <Button
                  mode="contained"
                  mode="contained"
                  color="#D71182"
                  disabled={false}
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
