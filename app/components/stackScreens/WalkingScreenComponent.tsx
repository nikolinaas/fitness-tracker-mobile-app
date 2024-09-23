import { LinearGradient } from "expo-linear-gradient";
import { Pedometer } from "expo-sensors";
import React from "react";
import { useEffect } from "react";
import {useState}  from 'react';
import { View, Text, PermissionsAndroid,StyleSheet } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export function Walking(){

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    }})
    
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
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

      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

    

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    
  };

  useEffect(() => {
    // requestMovePermission();
   subscribe();

  },[]);




    return(
      <LinearGradient
      colors={["steelblue", "powderblue", "skyblue"]}
      style={styles.container}>
        <View>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
   
        
            
        </View>
        </LinearGradient>
    )
}
