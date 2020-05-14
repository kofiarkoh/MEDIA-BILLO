import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet,Image,Linking} from 'react-native';
import img from '../Images/bilo-logo.jpg';
import {Avatar} from 'react-native-paper';
import {SocialIcon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const ig_url = 'https://www.instagram.com/thebillostv/'
const fb_url = 'https://facebook.com/Media-Billo-103633607802708/?refid=46&__xts__%5B0%5D=12.Abo4yBTOYdbad-Tyt_wgEdWemSzmywJ0j5zM3vvuMfwEPwUIsqCXp7yQoDtiZ40gdHehMPr775MhdX85KtiYj65nNxYMMv6ma8FRrrcJRcrStKy71yICGHNagrIyw_oLNdA_rQ8hrAumPVUtwbEqhm-xARv8trBM8l83IUiBz591SbVUOIZxtro2l_jEzlLd_Ljg32ViVfjXKv_Z0zvqZcb0Er66cLaLHdwxbDD66wJjRCmSW9A8_Dw_DUUMJ3d6LE8hSOU2lw90lAD6A7nqjBE3iAl1YXETc33qClZ_rV4w2D1d5xVEdqMZTcRC-Vv2SViJa4OCXjpEqv3zyi6liHrHnAMj1z_8_BdvztTf3_Chb-tk9byfTiAdTazOzug_zpYaxgNFmVGo7DjVAGC2tubvpiRj8sC5SykAH9kuHPJGIfR_WgwdcB5q8ZcCgjZEBAvES_2-TKTAknCb626Kf_1WQFfUHDdI64eOcL0yVmnl5gOV1vKqjT4UoUs_ZkSR7ZlKyObN9KUAX3Z-iTwxyU1LaSsHnhAQcSQUsKwQ-RDRhiZb0qVv1Fe4c1H1TmleXhQ'
const twitter_url = 'https://twitter.com/BilloMedia'
const youtube_url = 'https://youtube.com/channel/UCakamJ5QsCd1tdRK9q8TcrA'
class AboutIndex extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  socialMediaFollow = async (id)=>{
    switch(id){
      case 'ig':
        await Linking.openURL(ig_url)
        break
      case 'fb':
        await Linking.openURL(fb_url)
        break
      case 'tw':
          await Linking.openURL(twitter_url)
          break
      case 'yt':
        await Linking.openURL(youtube_url)
        break
    }
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
            <SocialIcon title="MediaBillo" button type="facebook" onPress={()=>this.socialMediaFollow('fb')}/>
            <SocialIcon title="@MediaBillo" button type="twitter" onPress={()=>this.socialMediaFollow('tw')}/>
            <SocialIcon title="@MediaBillo" button type="instagram" onPress={()=>this.socialMediaFollow('ig')} />
            <SocialIcon title="Media Billo" button type="youtube" onPress={()=>this.socialMediaFollow('yt')}/>
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
