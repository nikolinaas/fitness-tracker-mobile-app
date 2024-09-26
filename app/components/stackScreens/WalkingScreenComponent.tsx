import { LinearGradient } from "expo-linear-gradient";
import { Pedometer } from "expo-sensors";
import React from "react";
import { useEffect } from "react";
import {useState}  from 'react';
import { View, Text, PermissionsAndroid,StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Map } from "../MapComponent";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export function Walking(){

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    button: {
    height: screenHeight / 8,
    backgroundColor: "skyblue",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 50,
    shadowRadius: 10 ,
    shadowOffset : { width: 1, height: 13},
    borderStyle:"solid",
    borderBlockColor:"black",
    borderRadius:25,
  },})
    
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);



  const requestMovePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        subscribe();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const subscribe =  () => {
    const isAvailable =  Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    console.log("is available " + String(isAvailable));

      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

    
      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    
  };

  useEffect(() => {
    //requestMovePermission();
   subscribe();

  },[]);




    return(
      <LinearGradient
      colors={["steelblue", "powderblue", "skyblue"]}
      style={styles.container}>
        <View>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <View style={{ width: screenWidth-30, height : screenHeight/3}}>
     
      <Map />
    </View>
    <TouchableOpacity style={styles.button}><Text>Start</Text></TouchableOpacity>
        
            
        </View>
        </LinearGradient>
    )
}
