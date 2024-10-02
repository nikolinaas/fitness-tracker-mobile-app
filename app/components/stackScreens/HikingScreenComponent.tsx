import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Barometer } from 'expo-sensors';
import { useEffect, useState } from "react";


export function Hiking(){

    const styles = StyleSheet.create({
        button: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          padding: 10,
          marginTop: 15,
        },
        wrapper: {
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          paddingHorizontal: 20,
        },
      });
    const [{ pressure, relativeAltitude }, setData] = useState<any>({ pressure: 0, relativeAltitude: 0 });
    const [subscription, setSubscription] = useState<any>(null);


    const toggleListener = () => {
        subscription ? unsubscribe() : subscribe();
      };
    
      const subscribe = () => {
        Barometer.getPermissionsAsync();
     console.log(   Barometer.isAvailableAsync())
        setSubscription(Barometer.addListener(setData));
      };
    
      const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };

    return(
        <View>
            <Text>Hikingcsdcdcd</Text>
      <Text>Barometer: Listener {subscription ? 'ACTIVE' : 'INACTIVE'}</Text>
      <Text>Pressure: {pressure} hPa</Text>
      <Text>
        Relative Altitude:{' '}{relativeAltitude}
      </Text>
      <TouchableOpacity onPress={toggleListener} style={styles.button}>
        <Text>Toggle listener</Text>
      </TouchableOpacity>
 
        </View>
    )

 
}
