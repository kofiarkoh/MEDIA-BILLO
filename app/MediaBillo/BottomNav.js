import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VotePage from './Pages/VotePage/Index';
import LeaderBoardIndex from './Pages/LeaderBoardPage/LeaderBoardIndex';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutIndex from './Pages/AboutPage/AboutIndex';
import TicketRoutes from './Pages/Tickets/TicketRoutes';
import { Icon } from 'native-base';
const Tab = createBottomTabNavigator();
export class BottomNav extends Component {
  render() {
    return (
      <Tab.Navigator
        style={{backgroundColor: 'red'}}
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
          activeTintColor: 'hotpink',
          inactiveTintColor: 'grey',
          backgroudColor: '#D71182',
          tabStyle: {
            marginBottom: 0,
            position: 'relative',
            width: '100%',
            bottom: 0,
          },
          style: {
            // backgroundColor:'red',
            padding: 0,
            //   height:90
          },
        }}>
        <Tab.Screen name="Home" component={VotePage} />
        <Tab.Screen
          name="Statistics"
          component={LeaderBoardIndex}
          screenOptions={{
            headerStyle: {
              backgroundColor: 'red',
            },
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={TicketRoutes}
          options={{
            tabBarIcon: ({f,color,size})=>(
              <Icon name='credit-card' type='FontAwesome'  style={{color:color}}   />
            )
          }}
          screenOptions={{
            headerStyle: {
              backgroundColor: 'red',
            },
          }}
        />
        <Tab.Screen name="About" component={AboutIndex} />
      </Tab.Navigator>
    );
  }
}

export default BottomNav;
