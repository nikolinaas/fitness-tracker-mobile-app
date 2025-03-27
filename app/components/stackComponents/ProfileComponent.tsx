import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../stackScreens/HomeScreenComponent';
import { ProfileScreen } from '../stackScreens/ProfileScreenComponent';
import { TextInput, View } from 'react-native';
import { RegisterScreen } from '../RegisterScreenComponent';
import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" key={'stackNavigator3'}>
      <Stack.Screen
        key={'stackScreenProfile'}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        key={'registerScreen'}
        name="Registration"
        component={RegisterScreen}
      />
    </Stack.Navigator>
    // <View collapsable={false}>
    //   <View style={{ marginTop: 100 }}>
    //     <TextInput placeholder="text"></TextInput>
    //   </View>
    // </View>
  );
}
