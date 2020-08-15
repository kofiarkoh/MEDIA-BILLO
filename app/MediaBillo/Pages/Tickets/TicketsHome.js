import React, {Component, useEffect, useState, useRef} from 'react';
import {View, Picker} from 'native-base';
import {TextInput, StyleSheet} from 'react-native';
import {Container, Header, Content, Form, Item} from 'native-base';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import RadioButtons from './RadioButtons';
import { fetchTicketEvents, sendOtp, sendOtpConfirmation } from '../ApiCalls/getticketevents';
import SuccessDialog from '../VotePage/SuccessDialog';
const networklist = [
  {
    category_name:'MTN',category_id:'MTN'
  },
  {
    category_name:'VODAFONE',category_id:'VOD'
  },
  {
    category_name:'AIRTEL-TIGO',category_id:'TIG'
  }
]
export default function TicketsHome() {
  const [isloading,setLoading] = useState(false)
  const [eventlist,setEventList] = useState([])
  const [selectedEvent,setEvent] = useState('')
  const [selectedEventIndex,setIndex] = useState(0)
  const [ntwkType,setNtwktype] = useState('')
  const [tickeckCategory,setTicketCategory] = useState('none')
  const [pricePerTicket,setPrice] = useState(0)
  const [phone,setPhone] = useState('0241585537')
  const [numTickets,setNumTickets] = useState('1')
  const otpDialogRef = useRef(null);

  const confirmOtp = async (otp) =>{
    var res = await sendOtpConfirmation(otp)

    alert(res.message)
  }
  const validateDetails = async ()=>{
    if(selectedEvent === ''){
      alert('Please choose an event')
      return
    }
    if(eventlist[selectedEventIndex].multi_ticket === 'true' && tickeckCategory === 'none'){
      alert('please choose a ticket category')
      return
    }
    if(phone.length !== 10){
      alert('10 digi Phone number required')
      return
    }
    if(ntwkType === ''){
      alert('Please choose your serive provider')
      return
    }
    if(numTickets < 1){
      alert('Please enter valid number of tickets to buy. MIN:1')
      return
    }
    var res = await sendOtp(phone,selectedEvent,ntwkType,tickeckCategory,numTickets,pricePerTicket)
    if(res.resp_code === 200) {
      //show dialog to enter otp
      otpDialogRef.current._showDialog()
    }else{
      //show the error message
      alert(res.message)
    }
   
  }
  const fetchevents = async ()=>{
    var res = await fetchTicketEvents()
    if(res.resp_code === 200){
      setEventList(res.message)
      
    }
    else{
      alert(res.message)
    }
  }
  const handleEventChange = (event_id)=>{
    var index = eventlist.findIndex(item => item.event_id === event_id)

    setEvent(event_id)
    if(eventlist[index].status === 'inactive'){
     alert('Ticket Has been Sold Out for this event')
     return
    } 
    if(eventlist[index].multi_ticket === 'false'){
      setPrice(eventlist[index].price)
      setTicketCategory('none')
    }  else{
      var prevCat = eventlist[index].categories.filter((item)=>item.category_id === tickeckCategory)
      if (prevCat.length !== 0){
        setPrice(prevCat[0].price)
      }
     
    
    } 
    setIndex(index)
  }
 const  handleCategoryChange = (category_id)=>{
 
    setTicketCategory(category_id)
    var category = eventlist[selectedEventIndex].categories.filter((item)=>item.category_id === category_id)
    if(category[0].is_sold_out === 'true'){
      alert('Ticket Sold Out for this category')
      return
    }
    setPrice(category[0].price)
    
  }
 
  useEffect(()=>{
    fetchevents()
  },[])
    return (
        <>
        
               <Content>
          <Form>
          <Text style={[styles.heading]}>Select Event</Text>
            <Item style={[styles.picker]} >
              <Picker  selectedValue={selectedEvent} onValueChange={(e)=>handleEventChange(e)}>

                {
                  eventlist.length === 0 ? null :
                  eventlist.map((item,i)=>{
                   /*  if(item.status === 'inactive') {
                      return 
                    } */
                    return <Picker.Item disabled={true} label={item.event_name} key={item.event_id} value={item.event_id}/>
                  })
                }
                
           
              </Picker>
            </Item>
            {
             ( eventlist.length !==0 && eventlist[selectedEventIndex].multi_ticket === "true" ) &&
              
              <React.Fragment>
                <Text style={[styles.heading]}>Select Ticket Type</Text>
                <RadioButtons selected={tickeckCategory} handlechange={handleCategoryChange} items={eventlist.length !==0 | true &&eventlist[selectedEventIndex].categories}/>
               </React.Fragment>

            }
       
           
            <Item style={[styles.inputField]}>
              <Input
                label="Enter Mobile Money Number"
                keyboardType="numeric"
                leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                value={phone}
                onChangeText={(num)=>setPhone(num)}
              />
            </Item>
            <Text style={[styles.heading]}>Select Service Provider</Text>
              <RadioButtons selected={ntwkType} items={networklist} handlechange={setNtwktype}/>
          
          
            <Item style={[styles.inputField]}> 
            <Input
              
              label={`Enter Number of tickets {GHS ${pricePerTicket} per ticket}`}
              keyboardType="phone-pad"
              leftIcon={{ type: 'font-awesome', name: 'money' }}
              value={numTickets}
              onChangeText={num=>setNumTickets(num)}
              
              />
           
            </Item>
         
            <Item style={[styles.listItem]}>
              <View style={[styles.submitBtn]}>
                <Button
                  mode="contained"
                  mode="contained"
                  color="#D71182"
                  onPress={()=>validateDetails()}
                  loading={isloading}
                  disabled={isloading}
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
        <SuccessDialog ref={otpDialogRef} otpcall={confirmOtp}/>
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
    picker:{
      margin:20,
      marginLeft:25
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
  