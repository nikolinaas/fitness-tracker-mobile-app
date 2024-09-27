
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../stackScreens/HomeScreenComponent';
import { ProfileScreen } from '../stackScreens/ProfileScreenComponent';
import { View } from "react-native";
import React from "react";



const Stack = createStackNavigator();




export function ProfileStack(){

    return(
      
        <Stack.Navigator>
          <Stack.Screen name="Your profile" component={ProfileScreen}/>
        </Stack.Navigator>

       
    )
}