import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import axios from "axios";

export function Map() {

    const GOOGLE_API_KEY = 'AIzaSyA-yYE8ihM2rqirBu1ruRCBEy07C0A7yFY';

    const [latitude, setLatitude] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                //   setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude);
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            //   getCity(location.coords.latitude, location.coords.longitude)
            //  setLocation(location);
        })();
    },[]);




    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}></MapView>
        </View>
    );

}