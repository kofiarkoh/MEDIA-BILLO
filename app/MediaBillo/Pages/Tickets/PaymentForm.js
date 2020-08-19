import { Container, Content, Form, Item, Text, View } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { Button, RadioButton } from 'react-native-paper';
import eventlistStyles from './eventliststyles';


export default function PaymentForm() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
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
          <Container>
            <Form>
              <Item style={[styles.textInput]}>
                <Input label="Enter phone number" />
              </Item>
              <Text style={[styles.ntwkHeading]}>Select Service Provider</Text>
              <RadioButton.Group>
                <Item
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}
                  success={true}>
                  <RadioButton />
                  <Text>MTN</Text>
                </Item>
                <Item
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}>
                  <RadioButton />
                  <Text>VODAFONE</Text>
                </Item>
                <Item
                  style={{
                    borderColor: 'white',
                    marginBottom: 10,
                    marginLeft: 20,
                  }}
                  underline={false}>
                  <RadioButton />
                  <Text>AIRTEL-TIGO</Text>
                </Item>
              </RadioButton.Group>
              <Item style={[styles.textInput2]}>
                <Input label="Enter number of tickets to purchase" />
              </Item>
              <Button style={[styles.btn]}>
                  <Text style={{color:'white'}}>PAY</Text>
              </Button>
            </Form>

            <Content />
          </Container>
          </Content>
          <View style={[eventlistStyles.btnView]} />
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