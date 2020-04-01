import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Form, Item} from 'native-base';
import {RadioButton, Portal, Dialog, Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
export default function PickTicketType(props) {
 
  return (
    <Portal>
      <Dialog visible={props.visible} style={{}}>
        <Dialog.Title style={{color: 'white',backgroundColor:'rgba(113, 109, 116, 0.98)',marginTop:0,marginRight:0,marginLeft:0,padding:10,}}>Ticket Class</Dialog.Title>
        <Dialog.Content>
        

          <Form>
            <ScrollView>
              <RadioButton.Group value={props.selected} /* onValueChange={(v)=>props.setcategory(v) }*/>
                {
                  props.categories.length === 0 ? null :
                    props.categories.map((category)=>{
                      if (category.is_sold_out === 'true') return
                      return <Item
                      key={category.category_id}
                      onPress={()=>{
                        props.setcategory(category.category_id)
                        props.setprice(category.price)
                      }}
                      style={{borderColor: '#fff', marginBottom: 20,marginLeft:0}}
                      success={false}>
                      <RadioButton color='#000'  value={category.category_id}/>
                    <Text style={{color:'#000'}}>{category.category_name} @ GHC {category.price}</Text>
                    </Item>
                    })
                }
               
               
              </RadioButton.Group>
            </ScrollView>
          </Form>
        
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={()=>props.close('cancel')}>
                <Icon name='remove' color='rgba(113, 109, 116, 0.98)'  size={30}/>
             
               </Button>
            <Button onPress={()=>props.saveselection()}>
            <Icon name='check' color='green'  size={30}/>
            
                 </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
 
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'pink',
    // height: '50%',
    overflow: 'scroll',
  },
  heading: {
    fontSize: 30,
  },
});
