import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../stackScreens/HomeScreenComponent';



const Stack = createStackNavigator();




export function Feed(){

    return(
      
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
        
       
    )
}