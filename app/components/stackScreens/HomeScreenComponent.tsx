import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import '../../styles/StyleActivities.css';
import axios from 'axios';
import * as Location from 'expo-location';
import { decodeToken, isTokenValid } from '../../services/JWTService';
import { URL } from '../../services/URLService';
import { CompassComponent } from '../CompassComponent';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const colors = [
  'rgba(176, 224, 230,0.5)',
  'rgba(176, 224, 230,0.5)',
  'rgba(135, 206, 235,0.4)',
  'rgba(70, 130, 180,0.4)',
];
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'black',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1, index: any) => {
    return index != undefined ? colors[index] : 'rgba(0,0,0, 1)';
  },
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  viewLoading: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 20,
    alignItems: 'stretch',
    padding: 10,
    margin: 10,
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
    padding: 0,
  },
  brStyle: {
    height: 5,
  },
});

export function HomeScreen() {
  const [walking, setWalking] = useState(0.0);
  const [hiking, setHiking] = useState(0.0);
  const [running, setRunning] = useState(0.0);
  const [cycling, setCycling] = useState(0.0);

  const data = {
    labels: ['Cycling', 'Walking', 'Running', 'Hiking'], // optional
    data: [cycling, walking, running, hiking],
  };

  async function getActivities() {
    const token = await decodeToken();
    const config = {
      method: 'get',
      url: URL + ':8080/api/activities/' + token.jti + '/Walking',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const config2 = {
      method: 'get',
      url: URL + ':8080/api/activities/' + token.jti + '/Running',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    //hiking
    const config3 = {
      method: 'get',
      url: URL + ':8080/api/activities/' + token.jti + '/Hiking',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };
    //cycling
    const config4 = {
      method: 'get',
      url: URL + ':8080/api/activities/' + token.jti + '/Cycling',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };
    if (await isTokenValid()) {
      try {
        await axios(config2).then(async (resp: any) => {
          console.log('responseeeeeee' + resp.data);
          setRunning(resp.data);
        });
        await axios(config).then(async (resp: any) => {
          console.log('responseeeeeee' + resp.data);
          setWalking(resp.data);
        });

        await axios(config3).then(async (resp: any) => {
          console.log('responseeeeeee' + resp.data);
          setHiking(resp.data);
        });
        await axios(config4).then(async (resp: any) => {
          console.log('responseeeeeee' + resp.data);
          setCycling(resp.data);
        });
      } catch (error: any) {
        console.log(error.response);
        console.error('Error initiating:', error);
      }
    }
  }

  useEffect(() => {
    //  _subscribe();
    getActivities();
  });
  return (
    <LinearGradient
      colors={['steelblue', 'powderblue', 'skyblue']}
      style={styles.container}
    >
      <View>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={250}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <CompassComponent />
        </View>
      </View>
    </LinearGradient>
  );
}
