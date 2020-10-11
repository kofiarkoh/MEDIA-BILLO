import {Text, View} from 'native-base';
import React, {useRef, useEffect, useState} from 'react';
import {ProgressBarAndroid, Animated} from 'react-native';
import {Button} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import PickTicketType from './PickTicketType';
import ticketstyles from './ticketstyles';
import {useIsFocused} from '@react-navigation/native';
export default function TicketsLanding(props) {
  const rbsheetref = useRef();
  const isFocused = useIsFocused();
  const [dialogVisible, setDialog] = useState(false);
  const slideUpAnim = useRef(new Animated.Value(0)).current;

  const applyAnim = () => {
    //rbsheetref.current.open();
    //setDialog(!dialogVisible)
    Animated.timing(slideUpAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver:false
    }).start();
  };
  const checkFocus = () => {
    if (isFocused) {
      console.log('alive');
    } else {
      slideUpAnim.setValue(0);
      console.log('dead');
    }
  };
  const goToTicketsPage = () => {
   props.navigation.navigate('Tickets');
  };
  useEffect(() => {
    applyAnim(), checkFocus();
  }, [isFocused]);

  {
   
  }
  return (
   

    <View style={[ticketstyles.mainView]}>
      <View style={[ticketstyles.view1]}>
        <Text style={[ticketstyles.h1, {fontSize: 50}]}>Media Billo </Text>
        <Animated.View
          style={[
            ticketstyles.h2,
            {
              opacity: slideUpAnim,
              
            },
          ]}>
          <Animated.Text
            style={{
              fontSize: 40,
              color: slideUpAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['red', 'white'],
              }),
              lineHeight: slideUpAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 60],
              }),
            }}>
            {' '}
            E-Tickets Portal
          </Animated.Text>
        </Animated.View>
      </View>
      <View style={[ticketstyles.view2]}>
        <View style={[ticketstyles.btnView]}>
          <Button style={[ticketstyles.btn]} onPress={() => goToTicketsPage()}>
            <Text style={{color: 'white'}}>Buy Ticket</Text>
          </Button>
        </View>
      </View>
      <RBSheet closeOnDragDown={true} closeOnPressMask={false} ref={rbsheetref}>
        <ProgressBarAndroid />
      </RBSheet>
    </View>
  );
}
