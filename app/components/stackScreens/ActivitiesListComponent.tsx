
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pedometer } from 'expo-sensors';
import React from 'react';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
},
  scrollView: {
    display: "flex",
    height: screenHeight - 10

  },

  flatList: {
    height: screenHeight - 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 30
  },
  button: {
    height: screenHeight / 5,
    backgroundColor: "skyblue",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 50,
    shadowRadius: 10 ,
    shadowOffset : { width: 1, height: 13},
    borderStyle:"solid",
    borderBlockColor:"black",
    borderRadius:25,
  },
  text: {
    fontSize: 24,
    display: 'flex'
  }
});

export function ActivitiesList({ navigation }: { navigation: any }) {




  return (


    <LinearGradient
    colors={["steelblue" ,"powderblue","skyblue"]}
    style={styles.container}> 
    <View  style={styles.container}>
    <FlatList style={styles.flatList} data={[
      { key: 'Walking', icon: "walk", path: "Walking" },
      { key: 'Running', icon: "run", path: "Running" },
      { key: 'Cycling', icon: "bike", path: "Cycling" },
      { key: 'Hiking', icon: "biathlon", path: "Hiking" }
    ]}
      renderItem={({ item }) =>
      <TouchableOpacity key={item.key} onPress={() => { navigation.navigate(item.path); }} style={styles.button}>
     <Text style={styles.text}> <MaterialCommunityIcons  name={item.icon} color={"black"} size={24} /> {item.key} </Text>
</TouchableOpacity>}
     //<Button id="button" style={styles.button} onPress={() => { navigation.navigate(item.path); }}> <MaterialCommunityIcons style={styles.text} name={item.icon} color={"black"} size={24} /> <Text style={styles.text}> {item.key} </Text></Button>}
    />


</View>
</LinearGradient>
  )
}