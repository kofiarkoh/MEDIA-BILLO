import React, { Component } from 'react'
import {
    Content,
    Container,
    Card,
    CardItem,
    Button,
    Icon,
    Fab,
  } from 'native-base';
 class RefreshFab extends Component {
    render() {
        return (
            <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#00adf1'}}
            position="bottomRight"
            dis
            onPress={() => {
              this.props.refresh();
            }}>
            <Icon name="refresh" />
          </Fab>
        )
    }
}

export default RefreshFab
