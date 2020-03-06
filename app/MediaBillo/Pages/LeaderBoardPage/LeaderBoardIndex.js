import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LeaderBoard from './LeaderBoard';
const Stack = createStackNavigator();
class LeaderBoardIndex extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="LeaderBoard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D71182',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="LeaderBaord" component={LeaderBoard} />
      </Stack.Navigator>
    );
  }
}

export default LeaderBoardIndex;
