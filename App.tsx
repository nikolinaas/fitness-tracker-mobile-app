import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './app/components/NavBarTopComponent';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function App() {
  return (
  
      <NavigationContainer key={"navigation"}> 
      <NavBar></NavBar>
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
