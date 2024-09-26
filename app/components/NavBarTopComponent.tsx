import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileStack } from './stackComponents/ProfileComponent';
import { Feed } from './stackComponents/FeedComponents';
import { Activities } from './stackComponents/ActivitiesComponent';
import { useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
export function NavBar() {


  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="powderblue"
      barStyle={{ backgroundColor: 'steelblue' }}
      key={"key"}
     
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
      key={"key2"}
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
      key={"key3"}
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

