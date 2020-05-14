import React, {Component} from 'react';
//import cardimg from '../Images/eventflyer.jpg';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

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
class PollCardItem extends Component {
  render() {
    return (
      <Content style={[styles.carditem]}>
        <Card style={[styles.itemShadow]}>
          <CardItem
            cardBody
            button
            onPress={() => this.props.navigate(this.props.eventname)}>
          
            <Image
              source={{
                uri: this.props.imgpath,
              }}
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
            onPress={() => this.props.navigate(this.props.eventname)}>
            <Left>
              <Body>
                <Text style={[styles.title]}>{this.props.eventname}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    );
  }
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
    backgroundColor:'#bd3a85',// '#00adf1',
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

export default PollCardItem;
