import React, {Component} from 'react';
import {View} from 'native-base';
import {TextInput, StyleSheet} from 'react-native';
import {Container, Header, Content, Form, Item} from 'native-base';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
export default function TicketsHome() {
    return (
        <>
        
               <Content>
          <Form>
         <Item style={[styles.inputField]}> 
            <Input
              
              label="Enter Number of Votes {GHS 0.4 per vote}"
              keyboardType="phone-pad"
              leftIcon={{ type: 'font-awesome', name: 'money' }}
              /* value={`${this.state.noOfVotes}`}
              disabled={this.state.disableInput}
              onChangeText={text =>
                this.setState({noOfVotes: Math.round(text)})
              } */
              />
           
            </Item>
           
            <Text style={[styles.heading]}>Select Service Provider</Text>
            <RadioButton.Group
              color="red"
             /*  onValueChange={value => this.setState({ntwkType: value})} */
              /* value={this.state.ntwkType} */>
              <Item /* onPress={() => this.setState({ntwkType: 'MTN'})} */>
                <RadioButton
                  /* disabled={this.state.disableInput} */
                  color="#D71182"
                  value="MTN"
                />
                <Text>MTN</Text>
              </Item>
              <Item /* onPress={() => this.setState({ntwkType: 'VOD'})} */>
                <RadioButton
                  /* disabled={this.state.disableInput} */
                  color="#D71182"
                  value="VOD"
                />
                <Text>VODAFONE</Text>
              </Item>
              <Item /* onPress={() => this.setState({ntwkType: 'AIR'})} */>
                <RadioButton
                  /* disabled={this.state.disableInput} */
                  color="#D71182"
                  value="AIR"
                />
                <Text>AIRTEL</Text>
              </Item>
              <Item /* onPress={() => this.setState({ntwkType: 'TIG'})} */>
                <RadioButton
                  /* disabled={this.state.disableInput} */
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
               /*  value={this.state.phoneNumber}
                disabled={this.state.disableInput}
                onChangeText={text => this.setState({phoneNumber: text})} */
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
                 /*  disabled={this.state.disableInput}
                  loading={this.state.loading}
                  onPress={this.submitData} */>
                  {/* {this.state.buttonText} */}
                  send
                </Button>
              </View>
            </Item>
          </Form>
        </Content>
        <Snackbar
         /*  visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})} */
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
            },
          }}>
         {/*  {this.state.msg} */}
        </Snackbar>
        </>
    )
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
  