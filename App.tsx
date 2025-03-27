import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './app/components/NavBarTopComponent';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from './app/components/stackScreens/ProfileScreenComponent';
import { ActivitiesList } from './app/components/stackScreens/ActivitiesListComponent';
import { Activities } from './app/components/stackComponents/ActivitiesComponent';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feed } from './app/components/stackComponents/FeedComponents';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Component1 } from './app/components/Component1';
import { Component2 } from './app/components/Component2';
import { ProfileOverviewScreen } from './app/components/ProfileOverview';
import { ProfileStack } from './app/components/stackComponents/ProfileComponent';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer key={'navigation'}>
      {/* <NavBar></NavBar> */}
      {/* <Stack.Navigator initialRouteName="ProfileScreen">
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Activities" component={Activities} />
      </Stack.Navigator> */}
      <Tab.Navigator
        activeColor="powderblue"
        barStyle={{ backgroundColor: 'steelblue' }}
        key={'key'}
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
        />
        <Tab.Screen
          name="Tab2"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import React, { useState } from 'react';
// import { TextInput, View, StyleSheet } from 'react-native';
// import { ProfileOverviewScreen } from './app/components/ProfileOverview';

// const App = () => {
//   const [text, setText] = useState('');

//   return (
//     <View style={styles.container}>
//       {/* <TextInput
//         style={styles.input}
//         value={text}
//         onChangeText={setText}
//         placeholder="Type here..."
//       />
//       <TextInput
//         style={styles.input}
//         value={text}
//         onChangeText={setText}
//         placeholder="Type here..."
//       /> */}
//       <ProfileOverviewScreen />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     paddingHorizontal: 10,
//   },
// });

// export default App;
