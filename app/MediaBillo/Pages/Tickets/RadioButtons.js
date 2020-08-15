import React from 'react'
import { View } from 'react-native'
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import {Container, Header, Content, Form, Item} from 'native-base';

export default function RadioButtons(props) {
    return (
        <RadioButton.Group
        style={{display:'flex',flexDirection:'row'}}
        color="red"
        value={props.selected}
        onValueChange={(e)=>props.handlechange(e)}
       >
           {
               props.items.map((item)=>{
                 if(item.is_sold_out === 'true'){
                   return null
                 }
               return <Item  key={item.category_id} onPress={() => props.handlechange(item.category_id)}>
                <RadioButton
                  /* disabled={this.state.disableInput} */
                  color="#D71182"
                  value={item.category_id}
                />
                <Text>{item.category_name}</Text>
              </Item>
               })
           }
     
      
       
      </RadioButton.Group>
    )
}
