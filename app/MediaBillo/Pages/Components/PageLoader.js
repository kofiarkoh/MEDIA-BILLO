import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PulseLoader from 'react-native-pulse-loader';
import img from '../Images/bilo-logo.jpg'
 class PageLoader extends Component {
    render() {
        return (
            <PulseLoader
           
        avatar={'https://scontent-fra3-1.cdninstagram.com/t51.2885-15/e35/11429705_386886401514376_550879228_n.jpg'}
      />
        )
    }
}

export default PageLoader
