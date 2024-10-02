import { LinearGradient } from "expo-linear-gradient";
import { Pedometer } from "expo-sensors";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet, Dimensions, TouchableOpacity, Animated } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Map } from "../MapComponent";
import * as Location from 'expo-location';
import { ProgressBar } from "react-native-paper";
// import {Stopwatch, Timer} from 'react-native-stopwatch-timer'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export function Walking() {

  const styles = StyleSheet.create({
    boxLabel: {
      backgroundColor: "rgba(22, 58, 89, 0.8)",
      color: 'white',
      flex: 1,
      borderRadius: 25,
      minHeight: 100,
      width: 100,
      margin: 10,
      alignItems: "center",
      justifyContent: "center"

    },
    boxTimer: {
      backgroundColor: "rgba(22, 58, 89, 0.8)",
      color: 'white',
      flex: 1,
      borderRadius: 25,
height:100,
      margin: 5,
      alignItems: "center",
      justifyContent: "center"

    },
    text: {
      color: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    textData: {
      color: "white",
      fontWeight: 'bold',
      fontSize: 24,
      alignItems: "center",
      justifyContent: "center"
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start"
    },
    button: {
      height: screenHeight / 9,
      backgroundColor: "rgba(22, 58, 89, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: 'white',
      shadowOpacity: 0.8,
      elevation: 50,
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 13 },
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 25,
      margin: 5
    },
    barBack: {
      height: 20,
      backgroundColor: "rgba(22, 58, 89, 0.8)",
      borderRadius: 10
    },
    bar: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 10
    },

  })

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const barWidth = useRef(new Animated.Value(0)).current;

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [started, setStarted] = useState<Boolean>(false);
  const [buttonText, setButtonText] = useState("Start");

  const [goal, setGoal] = useState(1000);

  const progressPercent = barWidth.interpolate({
    inputRange: [0, goal],
    outputRange: ["0%", `100%`],
  });

  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  // Function to start the stopwatch
  // const startStopwatch = () => {
  //     startTimeRef.current = Date.now() - time * 1000;
  //     intervalRef.current = setInterval(() => {
  //         setTime(Math.floor((Date.now() - 
  //         startTimeRef.current) / 1000));
  //     }, 1000);
  //     setRunning(true);
  // };
  // // Function to pause the stopwatch
  // const pauseStopwatch = () => {
  //     clearInterval(intervalRef.current);
  //     setRunning(false);
  // };
  // // Function to reset the stopwatch
  // const resetStopwatch = () => {
  //     clearInterval(intervalRef.current);
  //     setTime(0);
  //     setRunning(false);
  // };
  // // Function to resume the stopwatch
  // const resumeStopwatch = () => {
  //     startTimeRef.current = Date.now() - time * 1000;
  //     intervalRef.current = setInterval(() => {
  //         setTime(Math.floor(
  //             (Date.now() - startTimeRef.current) / 1000));
  //     }, 1000);
  //     setRunning(true);
  // };


  const requestMovePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Activity recognition permission',
          message:
            'Fitness tracker needs activity recognition permission ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the sensor');
        subscribe();
      } else {
        console.log('Activity recognition permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  const subscribe = () => {
    const isAvailable = Pedometer.isAvailableAsync();

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    // Animated.timing(barWidth, {
    //   toValue: 1,
    //   useNativeDriver: false
    // }).start();

    return Pedometer.watchStepCount(result => {
      console.log(result.steps)
      setCurrentStepCount(result.steps);

      Animated.timing(barWidth, {
        toValue: result.steps,
        useNativeDriver: false
      }).start();
    });

  };


  function startCounting() {

    if (started === false) {
      console.log("staaaart");
      requestMovePermission();
      setButtonText("Stop");
      setStarted(true);
    } else {
      setButtonText("Start");
      console.log("stop");
      setStarted(false);
    }

  }

  useEffect(() => {


  }, [])

  return (
    <LinearGradient
      colors={["steelblue", "powderblue", "skyblue"]}
      style={styles.container}>
      <View>
        {/* <Text>Walk! And watch this go up: {currentStepCount}</Text> */}
        <View style={{ width: screenWidth - 30, height: screenHeight / 1.5 }}>
          {/* <Stopwatch
          laps
          msecs
   
            start={stopwatchStart}
            
            reset={resetStopwatch}
           
            options={{ backgroundColor: '#566573',
              padding: 5,
              borderRadius: 5,
              width: 200,
              alignItems: 'center',}}
            
          
            getTime={(time) => {
              console.log(time);
            }}
          /> */}
          <View style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row'
          }}>
            <View style={styles.boxLabel}><Text style={styles.text}>Steps</Text>
              <Text style={styles.textData}> {currentStepCount}</Text>
            </View>
            <View style={styles.boxLabel}><Text style={styles.text}>Distance</Text></View>
            <View style={styles.boxLabel}><Text style={styles.text}>Speed</Text></View>

          </View>
          <View style={[{ display: 'flex' , maxHeight:100}, styles.boxTimer]}><Text style={styles.textData}>Timer</Text></View>

          <View style={{ padding: 5 }}>
            <Text style={[styles.text, { fontSize: 18 }]}>{currentStepCount}/{goal} (Daily goal)</Text>
            <View style={styles.barBack}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    borderRadius: 10,
                    backgroundColor: 'powderblue',
                    width: progressPercent,
                  }
                ]}
              />
            </View>
          </View>
          <View style={{ height: screenHeight/3.5, width: '100%', display:'flex', padding :5 }}>
          <Map started={started} />
        </View>
        </View>
      


        <TouchableOpacity onPress={startCounting} style={styles.button}><Text style={styles.textData}>{buttonText}</Text></TouchableOpacity>
      </View>
    </LinearGradient>
  )
}
