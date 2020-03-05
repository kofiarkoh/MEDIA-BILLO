import React, {Component} from 'react';
import {Text, View,Image, StyleSheet} from 'react-native';
import svgloader from '../Images/logo.png';
import * as Animatable from 'react-native-animatable';
class LoadingIcon extends Component {
  render() {
    return (
      <Animatable.View
        style={[styles.centerContent]}
        animation="fadeIn"
        iterationCount={'infinite'}
        direction="alternate">
        <Image style={{width: 100, height: 100}} source={svgloader} />
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIcon;
