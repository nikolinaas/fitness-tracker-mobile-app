import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './app/components/NavBarTopComponent';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
  
      <NavigationContainer>
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
