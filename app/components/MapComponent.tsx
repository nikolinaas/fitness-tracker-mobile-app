import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { AnimatedRegion, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { render } from 'react-dom';

interface Props {
  started?: any;
  distanceSet: (param: any) => void;
  speedSet: (param: any) => void;
  coordinatesSet: (param: any) => void;
  // any props that come into the component
}

interface State {
  latitude: number;
  longitude: number;
  routeCoordinates: any[];
  distanceTravelled: number;
  prevLatLng: {};
}

const styles = StyleSheet.create({
  boxLabel: {
    backgroundColor: 'rgba(22, 58, 89, 0.8)',
    color: 'white',
    flex: 1,
    borderRadius: 25,
    minHeight: 100,
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
});

export function Map({
  started,
  distanceSet,
  speedSet,
  coordinatesSet,
  ...props
}: Props) {
  const haversine = require('haversine');
  const GOOGLE_API_KEY = 'AIzaSyA-yYE8ihM2rqirBu1ruRCBEy07C0A7yFY';

  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const initialState: State = {
    latitude: 0,
    longitude: 0,
    routeCoordinates: [{ longitude: longitude, latitude: latitude }],
    distanceTravelled: 0,
    prevLatLng: {},
  };

  const [errorMsg, setErrorMsg] = useState('null');
  const [location, setLocation] = useState(false);
  const [state, setState] = useState<State>(initialState);
  const [intervalTimer, setTimerInterval] = useState<any>(null);
  const flipInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [speed, setSpeed] = useState<any>(0);

  const requestLocationPermission = async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(true);
    })();
  };

  const calcDistance = (newLatLng: any) => {
    const { prevLatLng } = state;
    const dist = haversine(prevLatLng, newLatLng) || 0;
    return dist * 1000;
  };

  async function getStartLocation() {
    await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High },
      (loc) => {
        const { routeCoordinates, distanceTravelled } = state;
        const statee: State = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          routeCoordinates: routeCoordinates.concat([loc.coords]),
          distanceTravelled: distanceTravelled + calcDistance(loc.coords),
          prevLatLng: loc.coords,
        };
      }
    );
  }
  function componentDidMount() {
    getStartLocation();
    flipInterval.current = setInterval(() => {
      (async () => {
        const { routeCoordinates, distanceTravelled } = state;
        await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High },
          (loc) => {
            const statee: State = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              routeCoordinates: routeCoordinates.concat([loc.coords]),
              distanceTravelled: distanceTravelled + calcDistance(loc.coords),
              prevLatLng: loc.coords,
            };
            setLatitude(loc.coords.latitude);
            setLongitude(loc.coords.longitude);
            setSpeed(loc.coords.speed);

            speedSet(loc.coords.speed);
            setState(statee);
            distanceSet(state.distanceTravelled);
            coordinatesSet(state.routeCoordinates);
          }
        );

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        setTimerInterval(flipInterval.current);
        setLocation(true);
      })();
      console.log('cooord ' + state.routeCoordinates);
    }, 1000);
  }
  function componentWillUnmount() {
    console.log('stooopp TIMEEEEEEEEER');
    clearInterval(intervalTimer);
  }
  useEffect(() => {
    console.log('maap useefect' + started);
    requestLocationPermission();
    if (started === true) {
      console.log('map staaaaart');
      componentDidMount();
    } else if (started === false) {
      console.log('map stooop');
      componentWillUnmount();
    }
  }, [speed]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View style={styles.boxLabel}>
          <Text style={styles.text}>Distance</Text>
          <Text style={styles.textData}>
            {state.distanceTravelled.toFixed(2)}m
          </Text>
        </View>
        <View style={styles.boxLabel}>
          <Text style={styles.text}>Speed</Text>
          <Text style={styles.textData}>{speed.toFixed(2)}km/h</Text>
        </View>
      </View>

      {location === true ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0006,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="My location"
          ></Marker>
          <Polyline
            coordinates={state.routeCoordinates}
            strokeColor="#4682B4"
            strokeColors={[
              '#7F0000',
              '#00000000',
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={4}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
