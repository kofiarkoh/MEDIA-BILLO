import React, {useRef, useEffect, useState} from 'react';
import {Animated, Easing, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import eventlistStyles from './eventliststyles';
import {View, Text, Content, Container} from 'native-base';
import TicketEventCard from './TicketEventCard';
import PickTicketType from './PickTicketType';
import {fetchTicketEvents} from '../ApiCalls/getticketevents';
import LoadingIcon from '../Components/LoadingIcon';

export default function TicketEvents(props) {
  const [eventlist, setEventList] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectdEvent] = useState('');
  const [selectedEventCategories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getEvents = async () => {
    setLoading(true);
    var res = await fetchTicketEvents();
    if (res.resp_code === 200) {
      setEventList(res.message);
    } else {
      alert(res.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getEvents();
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.bezier(0, 0.2, 0.7, 0.9),
        duration: 2000,
      }),
      {
        iterations: -1,
      },
    ).start();
  }, [fadeAnim]);

  const handleCategorySelection = () => {
    setDialogOpen(false);
    if (selectedCategory === '') {
      return;
    }
    props.navigation.navigate('ticketspay', {
      eventid: selectedEvent,
      catid: selectedCategory,
      price: price,
    });
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const goToPayment = item => {
    if (eventlist[item].multi_ticket === 'true') {
      //display dialog
      setSelectdEvent(eventlist[item].event_id);
      setCategories(eventlist[item].categories);
      setDialogOpen(true);
    } else {
      props.navigation.navigate('ticketspay', {
        eventid: eventlist[item].event_id,
        catid: 'none',
        price: eventlist[item].price,
      });
    }
  };
  return (
    <View style={[eventlistStyles.mainView]}>
      <Animated.View
        style={
          ([eventlistStyles.view1],
          {
            backgroundColor: fadeAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ['#D71182', '#d71181c4', '#f339a3'],
            }),
            flex: 1,
            height: 200,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          })
        }>
        <Text style={[eventlistStyles.h2]}>TICKETS</Text>
        <Text style={[eventlistStyles.h1]}>CHOOSE EVENT </Text>
      </Animated.View>
      <View style={[eventlistStyles.view2]}>
        <Container>
          {isloading && (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <LoadingIcon />
            </View>
          )}
          <Content>
            {eventlist.length === 0
              ? null
              : eventlist.map((item, i) => {
                  if (item.status === 'inactive') return
                  return (
                    <TicketEventCard
                      key={item.event_id}
                      index={i}
                      eventid={item.event_id}
                      title={item.event_name}
                      nav={goToPayment}
                    />
                  );
                })}
          </Content>
        </Container>
        <View style={[eventlistStyles.btnView]} />
      </View>
    {/*   <View style={[eventlistStyles.view1]}>

      </View> */}
      <PickTicketType
        setprice={setPrice}
        setcategory={setSelectedCategory}
        selected={selectedCategory}
        categories={selectedEventCategories}
        visible={dialogOpen}
        close={handleClose}
        saveselection={handleCategorySelection}
      />
    
    </View>
  );
}
