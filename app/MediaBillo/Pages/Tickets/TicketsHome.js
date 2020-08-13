import React, {Component, useEffect, useState} from 'react';
import {View, Picker} from 'native-base';
import {TextInput, StyleSheet} from 'react-native';
import {Container, Header, Content, Form, Item} from 'native-base';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import RadioButtons from './RadioButtons';
import { fetchTicketEvents } from '../ApiCalls/getticketevents';
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
  const [eventlist,setEventList] = useState([])
  const [selectedEvent,setEvent] = useState('')
  const [selectedEventIndex,setIndex] = useState(0)
  const [ntwkType,setNtwktype] = useState('')
  const [tickeckCategory,setTicketCategory] = useState('')
  const [pricePerTicket,setPrice] = useState(0)
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
    setEvent(event_id)
    var index = eventlist.findIndex(item => item.event_id === event_id)
    if(eventlist[index].multi_ticket === 'false'){
      setPrice(eventlist[index].price)
    }
    setIndex(index)
  }
 const  handleCategoryChange = (category_id)=>{
    setTicketCategory(category_id)
    var price = eventlist[selectedEventIndex].categories.map((item)=> item.category_id === category_id && item.price)
    setPrice(price)
    
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
                    return <Picker.Item label={item.event_name} key={item.event_id} value={item.event_id}/>
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
               /*  value={this.state.phoneNumber}
                disabled={this.state.disableInput}
                onChangeText={text => this.setState({phoneNumber: text})} */
              />
            </Item>
            <Text style={[styles.heading]}>Select Service Provider</Text>
              <RadioButtons selected={ntwkType} items={networklist} handlechange={setNtwktype}/>
          
          
            <Item style={[styles.inputField]}> 
            <Input
              
              label={`Enter Number of tickets {GHS ${pricePerTicket} per ticket}`}
              keyboardType="phone-pad"
              leftIcon={{ type: 'font-awesome', name: 'money' }}
              
              />
           
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
  