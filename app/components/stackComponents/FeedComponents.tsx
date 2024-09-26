import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../stackScreens/HomeScreenComponent';



const Stack = createStackNavigator();




export function Feed(){

    return(
      
        <Stack.Navigator key={"stackNavigator"}>
          <Stack.Screen key={"stackScreenHome"} name="Home" component={HomeScreen}/>
        </Stack.Navigator>
        
       
    )
}