import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TicketsLanding from './TicketsLanding';
import AnimatedList from './AnimatedList';
import PaymentForm from './PaymentForm'
const Stack = createStackNavigator();
export default function TicketRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="tickethome"
      /*  screenOptions={{
           headerStyle: {
             backgroundColor: '#D71182',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }} */
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="tickethome"
        component={TicketsLanding}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Tickets"
        component={AnimatedList}
      />
       <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ticketspay"
        component={PaymentForm}
      />
    </Stack.Navigator>
  );
}
