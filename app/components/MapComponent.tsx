import React, { ReactNode, useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { AnimatedRegion, Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import axios from "axios";
interface Props {
    started?: any
    // any props that come into the component
}

interface State {
    latitude: number,
    longitude: number,
    routeCoordinates: any[],
    distanceTravelled: number,
    prevLatLng: {},
    coordinate: AnimatedRegion
}

const initialState: State = {
    latitude: 0,
    longitude: 0,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0
    })
}

export function Map({ started, ...props }: Props) {

    const GOOGLE_API_KEY = 'AIzaSyA-yYE8ihM2rqirBu1ruRCBEy07C0A7yFY';

    const [latitude, setLatitude] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("null");
    const [location, setLocation] = useState(false);
    const [state, setState] = useState<State>(initialState);
    const [intervalTimer, setTimerInterval] = useState<any>(null);
    const [timer, setTimer] = React.useState(5);
    const flipInterval = useRef<ReturnType<typeof setInterval> | null>(null);


    function getSeconds(time:any){
        return `0${time%60}`.slice(-2);
      }
    
    function getMinutes(time:any){
        return Math.floor(time/60);
      }

    const requestLocationPermission = async () => {


        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setLocation(true);

        })();
    }



    function componentDidMount() {

        
        
            flipInterval.current  = setInterval(() => {


            (async () => {

                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                const { coordinate, routeCoordinates, distanceTravelled } = state;
                let location = await Location.getCurrentPositionAsync({});
                console.log("maaap" + location.coords.latitude);
                console.log("maaap" + location.coords.longitude);
              

                const newCoordinate = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
                const statee: State = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled: 0,
                    prevLatLng: newCoordinate,
                    coordinate: new AnimatedRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                }
                setTimerInterval(flipInterval.current);
                setState(statee);
                setLocation(true);


            })();



        }, 1000);
    }


    function componentWillUnmount() {
        console.log("stooopp TIMEEEEEEEEER")
        clearInterval(intervalTimer);
    }


    useEffect(() => {
        console.log("maap useefect" +started)
        requestLocationPermission();
        if (started === true) {
            console.log("map staaaaart")
            componentDidMount();

        } else if (started === false) {
            console.log("map stooop")
            componentWillUnmount();
        }
        //
    },[started]);



    return (
        <View style={{ flex: 1 }}>
            {location === true ? <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.8025259,
                    longitude:-122.4351431,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0121
                }}
            >
                <Marker coordinate={{ latitude: latitude, longitude: longitude }} title="My location"></Marker>
                <Polyline
                    coordinates={[
                        {latitude: 37.8025259, longitude: -122.4351431},
                        {latitude: 37.7896376, longitude: -122.421636},
                        {latitude: 37.7896386, longitude: -122.421646},
                        {latitude: 37.7665248, longitude: -122.4161628},
                        {latitude: 37.7734153, longitude: -122.4577787},
                        {latitude: 37.7948605, longitude: -122.4596065},
                        {latitude: 37.8025259, longitude: -122.4351431},
                      ]}
                      strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                      strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000',
                      ]}
                      strokeWidth={6}
                />
            </MapView> : <ActivityIndicator size="large" color="#0000ff" />}

        </View>
    );

}

function componentDidMount() {
    throw new Error("Function not implemented.");
}
