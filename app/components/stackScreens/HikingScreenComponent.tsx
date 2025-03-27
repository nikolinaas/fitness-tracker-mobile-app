import { Barometer } from 'expo-sensors';
import { LinearGradient } from 'expo-linear-gradient';
import { Pedometer } from 'expo-sensors';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Map } from '../MapComponent';
import axios from 'axios';
import { decodeToken, getId, isTokenValid } from '../../services/JWTService';
import * as SecureStore from 'expo-secure-store';
import { URL } from '../../services/URLService';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function Hiking() {
  const styles = StyleSheet.create({
    boxLabel: {
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      color: 'white',
      flex: 1,
      borderRadius: 25,
      minHeight: 80,
      width: 100,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxTimer: {
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      color: 'white',
      flex: 1,
      borderRadius: 25,
      height: 100,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textData: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button: {
      height: screenHeight / 11,
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'white',
      shadowOpacity: 0.8,
      elevation: 50,
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 13 },
      borderStyle: 'solid',
      borderBlockColor: 'black',
      borderRadius: 20,
      margin: 5,
    },
    buttonBox: {
      display: 'flex',
      flexDirection: 'row',
    },
    barBack: {
      height: 20,
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      borderRadius: 10,
    },
    bar: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 10,
    },

    wrapper: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
  });

  const [{ pressure, relativeAltitude }, setData] = useState<any>({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [textBarometer, setTextBarometer] = useState(
    'Barometer is not available'
  );

  const toggleListener = () => {
    subscription ? unsubscribeBarometer() : subscribeBarometer();
  };

  const subscribeBarometer = async () => {
    Barometer.getPermissionsAsync();
    if ((await Barometer.isAvailableAsync()) === true) {
      setSubscription(Barometer.addListener(setData));
      setTextBarometer('Barometer is available');
    } else {
      setData('Barometer is not available');
    }
  };

  const unsubscribeBarometer = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const barWidth = useRef(new Animated.Value(0)).current;

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [started, setStarted] = useState<Boolean>(false);
  const [distance, setDistance] = useState<any>(0);
  const [buttonText, setButtonText] = useState('Start');
  const [speed, setSpeed] = useState<any>(0);
  const [coordinates, setCoordinates] = useState<any[]>();
  const [goal, setGoal] = useState(1000);
  const [userId, setUserId] = useState(0);
  const progressPercent = barWidth.interpolate({
    inputRange: [0, goal],
    outputRange: ['0%', `100%`],
  });

  const intervalRef = useRef<any>(null);
  const startTimeRef = useRef(0);
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };
  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };
  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  function getSeconds(time: any) {
    return `0${time % 60}`.slice(-2);
  }

  function getMinutes(time: any) {
    return `0${Math.floor(time / 60)}`.slice(-2);
  }

  function getMinutesByTime(time: any) {
    return Math.floor(time / 60);
  }

  function getHours(time: any) {
    return `0${Math.floor(getMinutesByTime(time) / 60)}`.slice(-2);
  }

  const requestMovePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Activity recognition permission',
          message: 'Fitness tracker needs activity recognition permission ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the sensor');
        subscribePedometer();
      } else {
        console.log('Activity recognition permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const subscribePedometer = () => {
    const isAvailable = Pedometer.isAvailableAsync();

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    return Pedometer.watchStepCount((result) => {
      console.log(result.steps);
      setCurrentStepCount(result.steps);

      Animated.timing(barWidth, {
        toValue: result.steps,
        useNativeDriver: false,
      }).start();
    });
  };

  function startCounting() {
    if (started === false) {
      console.log('staaaart');
      requestMovePermission();
      setButtonText('Stop');
      setStarted(true);
      startStopwatch();
    } else {
      setButtonText('Start');
      console.log('stop');
      setStarted(false);
      pauseStopwatch();
    }
  }

  async function saveActivity() {
    const jwtToken = await SecureStore.getItemAsync('token');
    const token = await decodeToken();
    if (await isTokenValid()) {
      const config = {
        method: 'post',
        url: URL + ':8080/api/activities/',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        data: {
          activityName: 'Hiking',
          distance: distance,
          speed: speed,
          steps: currentStepCount,
          duration: time,
          coordinates: coordinates,
          user: token.jti,
        },
      };
      try {
        console.log(config.data);
        await axios(config).then(async (resp: any) => {
          console.log(resp.data);
        });
      } catch (error: any) {
        console.log(error.response);
        console.error('Error initiating:', error);
      }
    }
    setButtonText('Start');
    console.log('stop');
    setStarted(false);
    resetStopwatch();
  }

  useEffect(() => {
    subscribeBarometer();
    setUserId(Number(getId()));
  }, []);

  function distanceSet(param: any) {
    setDistance(param);
  }

  function speedSet(param: any) {
    setSpeed(param);
  }
  function coordinatesSet(param: any) {
    setCoordinates(param);
  }
  return (
    <LinearGradient
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      <View>
        <View style={{ width: screenWidth - 30, height: screenHeight / 1.45 }}>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <View style={[styles.boxLabel, { width: screenWidth / 3 }]}>
              <Text style={styles.text}>Steps</Text>
              <Text style={styles.textData}> {currentStepCount}</Text>
            </View>
            <View
              style={[
                { display: 'flex', width: (screenWidth * 2) / 3 },
                styles.boxLabel,
              ]}
            >
              <Text style={styles.text}>Pressure</Text>
              <Text style={styles.textData}>{pressure} hPa</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <View
              style={[
                { display: 'flex', width: (screenWidth * 2) / 3 },
                styles.boxLabel,
              ]}
            >
              <Text style={styles.text}>Duration</Text>
              <Text style={styles.textData}>
                {getHours(time)}:{getMinutes(time)}:{getSeconds(time)}
              </Text>
            </View>
          </View>

          <View style={{ padding: 5 }}>
            <Text style={[styles.text, { fontSize: 18 }]}>
              {currentStepCount}/{goal} (Daily goal)
            </Text>
            <View style={styles.barBack}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    borderRadius: 10,
                    backgroundColor: 'powderblue',
                    width: progressPercent,
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={{
              height: screenHeight / 2.7,
              width: '100%',
              display: 'flex',
              padding: 5,
            }}
          >
            <Map
              started={started}
              distanceSet={distanceSet}
              speedSet={speedSet}
              coordinatesSet={coordinatesSet}
            />
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={startCounting} style={styles.button}>
            <Text style={styles.textData}>{buttonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveActivity} style={styles.button}>
            <Text style={styles.textData}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
