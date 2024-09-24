import { View, Text, StyleSheet, Dimensions, ActivityIndicator, PermissionsAndroid, ImageBackground } from "react-native";
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
        alignItems: "stretch",
        justifyContent: "flex-start"
    },
    boxLabel: {
        flex: 1,
        //  justifyContent: "flex-start",
        borderRadius: 30,
        minHeight: screenHeight / 2.8,
        width: screenWidth - 20,
        margin: 10
    },
    viewLoading: {
        flex: 1

    },
    image: {
        flex: 1,
        justifyContent: 'center',
        aspectRatio: 1,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'stretch',
        padding: 10
    },
    weatherData: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderEndColor: 'transparent',
        borderRadius: 30,
        padding: 0
    },
    brStyle: {
        height: 5
    }
})

export function HomeScreen() {


    const API_KEY = '0519f2e13ebaf2839b396894f3bc8e37';
    const CITY = 'Dubai';

    const imageClouds80x = { uri: '../../../assets/weatherBackgrounds/clouds.jpg' }
    const imageRain5xx = { uri: '../../../assets/weatherBackgrounds/rain.jpg' }
    const imageClearSky800 = { uri: '../../../assets/weatherBackgrounds/clearSky.jpg' }
    const imageThunderstorm2xx = { uri: '../../../assets/weatherBackgrounds/thunderstorm.jpg' }
    const imageAtmosphere7xx = { uri: '../../../assets/weatherBackgrounds/atmosphere.jpg' }
    const imageDrizzle3xx = { uri: '../../../assets/weatherBackgrounds/drizzle.jpg' }
    const imageSnow6xx = { uri: '../../../assets/weatherBackgrounds/snow.jpg' }
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

        requestPermission();


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



    const getImageByCode = (code: any): any => {

        if ((code + "").startsWith("5") === true) {

            return imageRain5xx.uri;
        } else if ((code + "").startsWith("80") == true && !(code === "800")) {
            return imageClouds80x.uri;
        } else if (code === "800") {
            return imageClearSky800.uri;
        } else if ((code + "").startsWith("20")) {
            return imageThunderstorm2xx.uri;
        } else if ((code + "").startsWith("70")) {
            return imageAtmosphere7xx.uri;
        } else if ((code + "").startsWith("30")) {
            return imageDrizzle3xx.uri;
        } else if ((code + "").startsWith("60")) {
            return imageSnow6xx.uri;
        }
    }


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


                <View style={styles.boxLabel}>
                    {weatherData === null ? <Text>No weather data available.</Text> :
                        <ImageBackground source={getImageByCode(weatherData.weather[0].id + "")} resizeMode="cover" style={styles.image}>

                            <View style={styles.weatherData}>

                                <Text>City: {weatherData.name}</Text>
                                <Text>Temperature: {weatherData.main.temp} °C</Text>
                                <Text>Feels like: {weatherData.main.feels_like} °C</Text>
                                <Text>Humidity: {weatherData.main.humidity} %</Text>
                                <Text>Pressure: {weatherData.main.pressure} mbar</Text>
                                <Text>Clouds: {weatherData.clouds.all} %</Text>
                                <Text>Weather: {weatherData.weather[0].main}</Text>
                                <Text>Description: {weatherData.weather[0].description}</Text>
                                <Text><img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}></img></Text>
                            </View>
                        </ImageBackground>}

                </View>

            </View>






            <Text style={styles.viewLoading}> <Text>{loading === true ?
                <ActivityIndicator size="large" color="#0000ff" /> : <Text></Text>}
            </Text>


            </Text>
            <br />
            <Text>
                {location}
            </Text>

        </LinearGradient>




    );

}

















