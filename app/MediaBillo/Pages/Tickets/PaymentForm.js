import { Container, Content, Form, Item, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Button, RadioButton } from 'react-native-paper';
import eventlistStyles from './eventliststyles';
import {sendTicketOtp, sendOtpConfirmation } from '../ApiCalls/getticketevents'
import SuccessDialog from '../VotePage/SuccessDialog';


export default function PaymentForm(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [phone,setPhone] = useState('')
  const [ntwk,setNtwk]  = useState('')
  const [numtickets,setTickets] = useState('')
  const [isloading,setLoading] = useState(false)
  const dialogRef = useRef()

  const getData =async ()=>{
     //fetches the users selections from the route
      if (phone.length !== 10) {
       alert('10 digit phone number required')
       return
     } 
     if (ntwk === '') {
       alert('Please choose MOMO operator')
       return
     }
     if (numtickets <0 || numtickets > 5) {
       alert('Number of tickets must be 1-5')
       return
     } 
     const params = props.route.params
     let data = {
       phone:phone,eventid:params.eventid,
       catId:params.catId,
       ntwk:ntwk,
       numTickets:numtickets,
       price:params.price
     }
     setLoading(true)
   
    var res = await sendTicketOtp(data)

     if(res.resp_code === 200) {
       //show the otp dialog
       dialogRef.current._showDialog()

     }
     else{
      // alert('An error occured,please try again...')
        alert(res.message)
     }
     setLoading(false)
  }


  const submitOtp = async (otp)=>{
  
    setLoading(true)
    var res = await sendOtpConfirmation(otp)
     if(res.resp_code === 200) {
    
     Alert.alert('Alert','Please wait for prompt to complete payment',[
      {
        text:'Ok',
        onPress : ()=>{
          props.navigation.navigate('tickethome')
        }
      }
    ],
    {
    
    })

     }
     else{
       alert(res.message)
     }
     setLoading(false)
  }
  useEffect(() => {
   
    Animated.timing(fadeAnim, {
      toValue: 1,
      easing: Easing.elastic(),
      duration: 2000,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={[
        eventlistStyles.mainView,
        {
          opacity: fadeAnim,
          height: '100%',
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0],
              }),
            },
          ],
        },
      ]}>
     
        <View style={[eventlistStyles.view1]}>
          <Text style={[eventlistStyles.h2]}>Payment</Text>
        </View>
        <View style={[eventlistStyles.view2]}>
        <Content>
          <Container style={{backgroundColor:'rgb(255, 253, 253)'}}>
            <Form>
              <Item style={[styles.textInput]}>
                <Input onChangeText={(t)=>setPhone(t)} value={phone} label="Enter phone number" keyboardType='phone-pad' />
              </Item>
              <Text style={[styles.ntwkHeading]}>Select Service Provider</Text>
              <RadioButton.Group value={ntwk}>
                <Item
                  onPress={()=>setNtwk('MTN')}
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}
                  success={true}>
                  <RadioButton value='MTN' color='#D71182'/>
                  <Text>MTN</Text>
                </Item>
                <Item
                onPress={()=>setNtwk('VOD')}
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}>
                  <RadioButton color='#D71182' value='VOD' />
                  <Text>VODAFONE</Text>
                </Item>
                <Item
                onPress={()=>setNtwk('TIG')}
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}>
                  <RadioButton value='TIG' color='#D71182' />
                  <Text>AIRTEL-TIGO</Text>
                </Item>
              </RadioButton.Group>
              <Item style={[styles.textInput2]}>
                <Input keyboardType='numeric' value={numtickets} onChangeText={(e)=>setTickets(Math.ceil(e))} label="Enter number of tickets to purchase" />
              </Item>
              <Button loading={isloading} disabled={isloading} onPress={()=>getData()} style={[styles.btn]}>
                  <Text style={{color:'white'}}>PAY</Text>
              </Button>
            </Form>

            <Content />
          </Container>
          </Content>
          <View style={[eventlistStyles.btnView]} />
          <SuccessDialog ref={dialogRef}otpcall={submitOtp}/>
        </View>
     
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    textInput:{
        marginTop:60
    },
    textInput2:{
        marginTop:30
    },
    ntwkHeading:{
        margin:20,
        textAlign:'center'
    },
    btn:{
        margin:40,
        bottom:10,
        backgroundColor: '#D71182',
        width:'50%',
        alignSelf:'center',
        color:'white',
        padding:5
    }
})