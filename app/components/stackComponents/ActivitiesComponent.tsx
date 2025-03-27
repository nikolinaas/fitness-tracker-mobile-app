import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cycling } from '../stackScreens/CyclingScreenComponent';
import { ActivitiesList } from '../stackScreens/ActivitiesListComponent';
import { Running } from '../stackScreens/RunningScreenComponent';
import { Walking } from '../stackScreens/WalkingScreenComponent';
import { Hiking } from '../stackScreens/HikingScreenComponent';

const Stack = createStackNavigator();
const screenHeight = Dimensions.get('window').height;

export function Activities() {
  return (
    <Stack.Navigator initialRouteName="ActivitiesList">
      <Stack.Screen name="Activities list" component={ActivitiesList} />
      <Stack.Screen name="Cycling" component={Cycling} />
      <Stack.Screen name="Running" component={Running} />
      <Stack.Screen name="Walking" component={Walking} />
      <Stack.Screen name="Hiking" component={Hiking} />
    </Stack.Navigator>
  );
}
