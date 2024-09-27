import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    }})


export function ProfileScreen(){
    return(
        <LinearGradient
        colors={["steelblue", "powderblue", "skyblue"]}
        style={styles.container}>
        <View>
            <Text>
            Profile
            </Text>
            
        </View>
        </LinearGradient>
    )
}
