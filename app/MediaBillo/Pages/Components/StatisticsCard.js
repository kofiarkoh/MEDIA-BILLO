//this card displays a contestant's name with his or her votes

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card, CardItem, Thumbnail, Icon, Left, Body, Right} from 'native-base';

export class StatisticsCard extends Component {
  render() {
    return (
      <Card style={[styles.cards]}>
        <CardItem style={{ backgroundColor:'#d71181' ,borderRadius:20}}>
          <Left>
            <Thumbnail
              source={{
                uri: this.props.imagePath,
              }}
            />
            <Body>
            <Text style={[styles.name]}>{this.props.name}</Text>
            </Body>
          </Left>
          <Right>
            <Body>
            <Text style={[styles.votes]}>{this.props.votes}</Text>
              <Text>VOTES</Text>
            </Body>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    marginTop:10,
    marginBottom:10,
    marginLeft:1,
    marginRight:2,
    color:'yellow',
    backgroundColor:'#d71181',
    borderRadius:20
  },
  name: {
    fontSize: 20,
    color:'white'
  },
  votes:{
      fontSize:30,
      color:'white'
  }
});

export default StatisticsCard;
