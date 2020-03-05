import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VotePage from './Pages/VotePage/Index';
import LeaderBoardIndex from './Pages/LeaderBoardPage/LeaderBoardIndex';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutIndex from './Pages/AboutPage/AboutIndex';
const Tab = createBottomTabNavigator();
export class BottomNav extends Component {
  render() {
    return (
      <Tab.Navigator
      
        screenOptions={({route}) => ({
          
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'ios-podium' : 'ios-podium';
            } else if (route.name === 'About') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
          backgroudColor:'red'
          
        }}>
        <Tab.Screen name="Home" component={VotePage}      />
        <Tab.Screen name="LeaderBoard" component={LeaderBoardIndex} screenOptions={{ headerStyle: {
                  backgroundColor: 'red',
                },}}/>
        <Tab.Screen name="About" component={AboutIndex} />
      </Tab.Navigator>
    );
  }
}

export default BottomNav

