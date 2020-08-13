import React from 'react'
import { View } from 'react-native'
import {Button, RadioButton, Text, Snackbar} from 'react-native-paper';
import {Container, Header, Content, Form, Item} from 'native-base';

export default function RadioButtons(props) {
    return (
        <RadioButton.Group
        color="red"
        value={props.selected}
        onValueChange={(e)=>props.handlechange(e)}
       >
           {
               props.items.map((item)=>{
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
