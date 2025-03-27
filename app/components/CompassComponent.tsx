import { useEffect, useState } from 'react';
import { Magnetometer } from 'expo-sensors';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export function CompassComponent() {
  const styles = StyleSheet.create({
    boxLabel: {
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      color: 'white',
      flex: 1,
      borderRadius: 25,
      minHeight: screenHeight / 2.5,
      width: screenWidth - 20,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
    },
    boxLabelInside: {
      backgroundColor: 'rgba(22, 58, 89, 0.8)',
      color: 'skyblue',
      flex: 1,
      borderRadius: 25,
      width: screenWidth - 40,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontSize: 16,
      color: 'skyblue',
    },
  });

  const [direction, setDirection] = useState('');
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(1000);
    Magnetometer.addListener((result) => {
      setData(result);
      calculateAngle();
    });
  };
  const [subscription, setSubscription] = useState(null);
  const [angle, setAngle] = useState(0);

  const getDirection = () => {
    const degree = _degree(angle);
    if (degree >= 22.5 && degree < 67.5) {
      setDirection('NE');
      return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
      setDirection('E');
      return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
      setDirection('SE');
      return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
      setDirection('S');
      return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
      setDirection('SW');
      return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
      setDirection('W');
      return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
      setDirection('NW');
      return 'NW';
    } else {
      setDirection('N');
      return 'N';
    }
  };
  const _degree = (magnetometer: any) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const calculateAngle = () => {
    setAngle(Math.atan2(y, x) * (180 / Math.PI));
    getDirection();
  };

  useEffect(() => {
    _subscribe();
  }, []);
  return (
    <View style={[{ display: 'flex' }, styles.boxLabel]}>
      <View style={styles.boxLabelInside}>
        <Text style={styles.textStyle}>Magnetometer measurements:</Text>
        <Text style={styles.textStyle}>x: {x}</Text>
        <Text style={styles.textStyle}>y: {y}</Text>
        <Text style={styles.textStyle}>z: {z}</Text>
        <Text style={styles.textStyle}>Angle: {_degree(angle)}</Text>
      </View>
      <View style={styles.boxLabelInside}>
        <Text style={{ fontSize: 24, color: 'skyblue' }}>
          Direction: {direction}
        </Text>
      </View>
    </View>
  );
}
