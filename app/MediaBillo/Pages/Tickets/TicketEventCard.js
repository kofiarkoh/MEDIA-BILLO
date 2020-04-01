import React, {Component} from 'react';
//import cardimg from '../Images/eventflyer.jpg';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import img from '../Images/b.jpeg';

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    View,
  } from 'native-base';
/* import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardImage,
} from 'react-native-material-cards'; */
function TicketEventCard(props) {
  return (
          <Content style={[styles.carditem]}>
    <Card style={[styles.itemShadow]} >
      <CardItem
        cardBody
        button
        onPress={()=>props.nav(props.index)} >
       
        <Image
          source={{uri:'http://admin.mediabillo.net/tdb/e-ticket-backend/dashboardbackend/ticketlogos/'+props.eventid+'.jpg'}}
          indicator={ProgressBar}
          indicatorProps={{
            size: 80,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)',
          }}
          style={[styles.imgItem]}
        />
      </CardItem>
      <CardItem
        style={[styles.itemBackground]}
        button
        onPress={()=>props.nav(props.index)}
        /* onPress={() => this.cardClicked()} */>
        <Left>
          <Body>
        <Text style={[styles.title]}>{props.title.replace(/_+/g,' ')}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  </Content>
 
       
 );
}
const styles = StyleSheet.create({
    carditem: {
      margin: 10,
      borderRadius: 20,
    },
    title: {
      fontSize: 20,
     color:'#fff'
    },
    itemBackground: {
      backgroundColor:'rgba(113, 109, 116, 0.98)',// '#00adf1',
    },
    imgItem: {
      width: null, //250,
      height:responsiveHeight(20),
      flex: 1,
    },
    itemShadow: {
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
  
      elevation: 20,
    },
  });
export default TicketEventCard;
