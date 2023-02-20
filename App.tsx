import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Accounts from "./src/screens/Accounts"
import Admin from './src/screens/admin/Admin'
import Details from "./src/screens/Details"
import Home from "./src/screens/Home"
import Listing from './src/screens/Listing'
import Map from './src/screens/Map'
import Profile from "./src/screens/Profile"
import Search from "./src/screens/Search"


const Stack = createNativeStackNavigator()

function App(){

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}/>
          <Stack.Screen name="Accounts" component={Accounts} options={{ headerShown: false }}/>
          <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
          <Stack.Screen name="Map" component={Map} options={{ headerShown: false }}/>
          <Stack.Screen name="Listing" component={Listing} options={{ headerShown: false }}/>
          <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
