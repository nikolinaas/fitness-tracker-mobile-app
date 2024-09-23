import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStack } from './stackComponents/ProfileComponent';
import { Feed } from './stackComponents/FeedComponents';
import { Activities } from './stackComponents/ActivitiesComponent';
import { useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();
export function NavBar() {

    let colorScheme = useColorScheme();
    const [activeColorr, setActiveColorr] = useState("");

    const Stack = createStackNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="powderblue"
      barStyle={{ backgroundColor: 'steelblue' }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="run" color={color} size={26} />
          ),
        }}
      >
        
        
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

