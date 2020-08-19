import React, {useRef, useEffect, useState} from 'react';
import {Animated, Easing, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import eventlistStyles from './eventliststyles';
import {View, Text, Content, Container} from 'native-base';
import TicketEventList from './TicketEventList';
import PickTicketType from './PickTicketType';
const m = [
  {
    id: '1',
    event_name: 'THE_JOY_MODEL_CHALLENGE',
    event_id: 'MBE-982508',
    multi_ticket: 'false',
    price: '10',
    status: 'active',
    categories: [
      {
        id: '3',
        event_id: 'MBE-982508',
        category_id: 'MBCA-210645',
        category_name: 'CATEGORY TWO',
        price: '60',
        is_sold_out: 'false',
      },
    ],
  },
  {
    id: '2',
    event_name: 'MISS_AGRICULTURE_GHANA',
    event_id: 'MBE-545028',
    multi_ticket: 'true',
    price: '20',
    status: 'active',
    categories: [
      {
        id: '1',
        event_id: 'MBE-545028',
        category_id: 'MBCA-888025',
        category_name: 'CATEGORY ONE',
        price: '25',
        is_sold_out: 'false',
      },
      {
        id: '2',
        event_id: 'MBE-545028',
        category_id: 'MBCA-499199',
        category_name: 'CATEGORY TWO',
        price: '50',
        is_sold_out: 'true',
      },
    ],
  },
];

export default function AnimatedList(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
      
        toValue: 1,
        easing: Easing.bezier(0,0.2,0.7,0.9),
        duration: 2000,
      }),
      {
        iterations: -1,
      },
    ).start();
  }, [fadeAnim]);

  const handleClose = t => {
    if (t === 'ok') {
      setDialogOpen(false);
      props.navigation.navigate('ticketspay');
    } else {
      setDialogOpen(false);
    }
  };
  const goToPayment = i => {
    if (m[i].multi_ticket === 'true') {
      //display dialog
      setDialogOpen(true);
    } else {
      props.navigation.navigate('ticketspay');
    }
  };
  return (
    <View style={[eventlistStyles.mainView]}>
      <Animated.View
        style={
          ([eventlistStyles.view1],
          {
            backgroundColor: fadeAnim.interpolate({
              inputRange: [0, 0.5,1],
              outputRange: ['#D71182', '#d71181c4' ,'#f339a3'],
            }),
            flex: 1,
            height: 200,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          })
        }>
        <Text style={[eventlistStyles.h2]}>CHOOSE </Text>
        <Text style={[eventlistStyles.h1]}>EVENT </Text>
      </Animated.View>
      <View style={[eventlistStyles.view2]}>
        <Container>
          <Content>
            {m.map((item, i) => {
              return (
                <TicketEventList
                  index={i}
                  title={item.event_name}
                  nav={goToPayment}
                />
              );
            })}
          </Content>
        </Container>
        <View style={[eventlistStyles.btnView]} />
      </View>
      <PickTicketType visible={dialogOpen} close={handleClose} />
      {/*  </View> */}
    </View>
  );
}
