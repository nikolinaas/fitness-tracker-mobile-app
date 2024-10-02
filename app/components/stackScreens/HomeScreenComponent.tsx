import { View, Text, StyleSheet, Dimensions, ActivityIndicator, PermissionsAndroid, ImageBackground, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import "../../styles/StyleActivities.css"
import axios from "axios";
import * as Location from 'expo-location';


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
        borderRadius: 30,
        minHeight: screenHeight / 2.8,
        width: screenWidth - 20,
        margin: 10,
        alignItems:"center",
         justifyContent: "flex-start"

    },
    viewLoading: {
        flex: 1

    },
    image: {
        flex: 1,
        justifyContent: 'center',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'stretch',
        padding: 10,
        margin:10,
        minHeight: screenHeight / 2.6,
        width: screenWidth - 20,
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
    const GOOGLE_API_KEY = 'AIzaSyA-yYE8ihM2rqirBu1ruRCBEy07C0A7yFY'
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);
    const [latitude, setLatitude] = useState<any>(null);
    const [cityWeather, setCityWeather] = useState("");
    const [errorMsg, setErrorMsg] = useState("null");



    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
    };



    const fetchWeather = async (city: any) => {
        console.log("ccccccccc" + city)
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
            setLoading(false);
        }
    }

    async function getCity(lat: any, long: any) {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`;
        console.log(url)
        const response = await axios.get(url)
        const data = response.data.results[0].address_components[2].long_name
        console.log(data);
        fetchWeather(data)
        setCityWeather(data);
        return data;

    }

    const requestPermission = async () => {


        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);

            getCity(location.coords.latitude, location.coords.longitude)
        })();


    };


    useEffect(() => {

        requestPermission();

    }, [])



    const getImageByCode = (code: any): any => {

        console.log(code)
        if ((code + "").startsWith("5") === true) {

            return require('../../../assets/weatherBackgrounds/rain.jpg');

        } else if (code === "800") {
            return require('../../../assets/weatherBackgrounds/clearSky.jpg');
        } else if ((code + "").startsWith("80") && (code !== "800")) {
            return require('../../../assets/weatherBackgrounds/clouds.jpg');
        } else if ((code + "").startsWith("20")) {
            return require('../../../assets/weatherBackgrounds/thunderstorm.jpg');
        } else if ((code + "").startsWith("70")) {
            return require('../../../assets/weatherBackgrounds/atmosphere.jpg');
        } else if ((code + "").startsWith("30")) {
            return require('../../../assets/weatherBackgrounds/drizzle.jpg');
        } else if ((code + "").startsWith("60")) {
            return require('../../../assets/weatherBackgrounds/snow.jpg');
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
                        <ImageBackground key={'image-${index}'} source={getImageByCode(weatherData.weather[0].id)} resizeMode="cover" style={styles.image}>

                            <View style={styles.weatherData}>
                                <Text>Location: {weatherData.name}</Text>
                                <Text>Temperature: {weatherData.main.temp} °C</Text>
                                <Text>Feels like: {weatherData.main.feels_like} °C</Text>
                                <Text>Humidity: {weatherData.main.humidity} %</Text>
                                <Text>Pressure: {weatherData.main.pressure} mbar</Text>
                                <Text>Clouds: {weatherData.clouds.all} %</Text>
                                <Text>Weather: {weatherData.weather[0].main}</Text>
                                <Text>Description: {weatherData.weather[0].description}</Text>
                              <Animated.Image    key={'image-${index}'} source={{ uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={{ width: 100, height: 100 }} />
                            </View>
                        </ImageBackground>}
                </View>

            </View>
            <Text style={styles.viewLoading}> <Text>{loading === true ?
                <ActivityIndicator size="large" color="#0000ff" /> : <Text></Text>}
            </Text>
            </Text>
            <Text>
                {location}
            </Text>

        </LinearGradient>




    );

}

















