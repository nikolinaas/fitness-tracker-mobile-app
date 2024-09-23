import { View, Text, StyleSheet, Dimensions, ActivityIndicator, PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import "../../styles/StyleActivities.css"
import axios from "axios";
import Geolocation from '@react-native-community/geolocation';
import config from "../../../metro.config";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const colors = [

    "rgba(176, 224, 230,0.5)",
    "rgba(176, 224, 230,0.5)",
    "rgba(135, 206, 235,0.5)",
    "rgba(70, 130, 180,0.5)"
]
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1, index: any) => {
        return index != undefined ? colors[index] : 'rgba(0,0,0, 1)'
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const data = {
    labels: ["Cycling", "Walking", "Running", "Hiking"], // optional
    data: [0.4, 0.6, 0.8, 0.5]

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    boxLabel: {
        minWidth: 80,
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    viewLoading: {
        flex: 1

    }
})

export function HomeScreen() {


    const API_KEY = '0519f2e13ebaf2839b396894f3bc8e37';
    const CITY = 'London'; // You can make this dynamic


    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<any>(null);

    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
    };


    const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            return true;
          } else {
            console.log('Location permission denied');
            return false;
          }
        } catch (err) {
          console.warn(err);
        }
      };

  
    useEffect(() => {

 //   requestPermission();


        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
                setLoading(false);
            }
        };
        Geolocation.getCurrentPosition(info => {
            console.log(info);
            //setLocation(info);
        });
        fetchWeather();
    }, [])






    return (
        <LinearGradient
            colors={["steelblue", "powderblue", "skyblue"]}
            style={styles.container}>
            <View style={styles.container}>
                <ProgressChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}

                />

                <Text style={styles.viewLoading}> <Text>{loading === true ?
                    <ActivityIndicator size="large" color="#0000ff" /> : <Text></Text>}
                </Text>
                    <Text> {weatherData === null ? <Text>No weather data available.</Text> : <Text>   <Text>City: {weatherData.name}</Text>
                        <Text>Temperature: {weatherData.main.temp} °C</Text>
                        <Text>Weather: {weatherData.weather[0].description}</Text>
                    </Text>}</Text>

                </Text>
<br/>
<Text>
{location}
</Text>


            </View>
        </LinearGradient>




    );

}

















