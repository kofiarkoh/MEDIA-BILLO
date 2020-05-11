import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet,Image} from 'react-native';
import img from '../Images/bilo-logo.jpg';
import {Avatar} from 'react-native-paper';
import {SocialIcon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
class AboutIndex extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Animatable.View
        style={[styles.centerContent]}
        animation="fadeIn"
        iterationCount={1}
        direction="alternate">
        <ScrollView >
          <View style={[styles.profilePic]}>
           
            <Text style={[styles.textStyle]}> MEDIA BILLO </Text>

          </View>
          <View style={[styles.profilePic]}>
            <Avatar.Image size={240} source={img
            } />

            <Image />
          </View>
          <View>
            <SocialIcon title="MediaBillo" button type="facebook" />
            <SocialIcon title="@MediaBillo" button type="twitter" />
            <SocialIcon title="@MediaBillo" button type="instagram" />
            <SocialIcon title="Media Billo" button type="youtube" />
          </View>
          <View style={[styles.profilePic]}>
            <Text style={[styles.textStyle]}>{'\u00A9'} 2020</Text>
            <Text>Powered by MickySoft Technologies</Text>
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  profilePic: {
   
    margin: 20,
    flex:1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
  },
});
export default AboutIndex;
