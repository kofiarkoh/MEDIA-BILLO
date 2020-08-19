import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Form, Item} from 'native-base';
import {RadioButton, Portal, Dialog, Button} from 'react-native-paper';

export default function PickTicketType(props) {
  return (
    <Portal>
      <Dialog visible={props.visible} style={{backgroundColor: '#D71182'}}>
        <Dialog.Title style={{color: 'white'}}>Ticket Class</Dialog.Title>
        <Dialog.Content>
          {/* <View style={[styles.mainView]}> */}

          <Form>
            <ScrollView>
              <RadioButton.Group>
                <Item
                  style={{borderColor: '#D71182', marginBottom: 20,marginLeft:0}}
                  success={false}>
                  <RadioButton />
                  <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
                </Item>
                <Item
                  style={{borderColor: '#D71182', marginBottom: 20,marginLeft:0}}
                  underline={false}>
                  <RadioButton />
                  <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
                </Item>
                <Item
                  style={{borderColor: '#D71182', marginBottom: 20,marginLeft:0}}
                  underline={false}>
                  <RadioButton />
                  <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
                </Item>
                <Item
                  style={{borderColor: '#D71182', marginBottom: 20,marginLeft:0}}
                  underline={false}>
                  <RadioButton />
                  <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
                </Item>
              </RadioButton.Group>
            </ScrollView>
          </Form>
          {/*   </View> */}
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={()=>props.close('cancel')}>
                <Text  style={{color:'black'}}>  CANCEL</Text>
               </Button>
            <Button onPress={()=>props.close('ok')}>
                <Text style={{color:'white'}}>PROCEED</Text>
                 </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    /*  <View style={[styles.mainView]}>
      <Text style={[styles.heading]}>Select Class of ticket</Text>
      <Form>
<ScrollView>
<RadioButton.Group>
            <Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item>
            <Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item>
            <Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item><Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item><Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item><Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item><Item style={{borderColor:'#D71182',marginBottom:20}} underline={false}>
              <RadioButton />
              <Text style={{color:'whitesmoke'}}>Ticket Category 1 @ GHC49</Text>
            </Item>
          </RadioButton.Group>
      
</ScrollView>
     
      </Form>
    </View> */
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
