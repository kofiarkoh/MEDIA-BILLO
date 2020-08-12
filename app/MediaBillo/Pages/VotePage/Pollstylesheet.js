import {StyleSheet} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

function Pollstylesheet() {
    return StyleSheet.create({
        btn: {
          color: '#e48a32',
        },
        centerContent: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'blue'
        },
        loading: {
          width: '100%',
          height: 2000,
          backgroundColor: 'orange',
          position: 'absolute',
        },
        card: {
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
          marginBottom: 30,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
        carditem: {
          backgroundColor: '#eae6ed',
        },
        pollCard: {
          height: 170,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
      
          color: 'white',
          width: responsiveWidth(100),
        },
        bgImg: {
          height: 350,
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          width: responsiveWidth(60),
        },
        errorImg: {
          height: 210,
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          width: responsiveWidth(50),
        },
      
        cardText: {
          fontSize: 25,
          color: '#7a6464',
          height: '100%',
          width: '100%',
          textAlign: 'center',
        },
        btn: {
          alignSelf: 'flex-start',
          backgroundColor: '#c969a8',
          width: 70,
          margin: 10,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        refreshBtn: {
          alignSelf: 'center',
          backgroundColor: '#c969a8',
          width: 70,
          margin: 10,
          height: 40,
          textAlign: 'center',
        },
      });
}

export default Pollstylesheet
