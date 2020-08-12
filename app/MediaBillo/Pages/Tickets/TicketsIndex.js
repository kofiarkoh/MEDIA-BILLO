import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TicketsHome from './TicketsHome';
const Stack = createStackNavigator();
class TicketsIndex extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Tickets"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D71182',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Tickets" component={TicketsHome} />
      </Stack.Navigator>
    );
  }
}

export default TicketsIndex;
