import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import VoteIndex from './VoteIndex';
import VoteAmount from './VoteAmount';
import Polls from './Polls';
const Stack = createStackNavigator();
 class VotePage extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Polls" 
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#e48a32',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
        <Stack.Screen name="CastVote" component={VoteIndex} />
        <Stack.Screen name="Payment" component={VoteAmount} />
        <Stack.Screen name='Polls' component={Polls}/>
      </Stack.Navigator>
        )
    }
}

export default VotePage
