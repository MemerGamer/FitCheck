import "./global.css"
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import { useState } from "react";
import HomeTabs from "./components/partials/HomeTabs";


const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" children={() => <HomeTabs setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} userId={userId} />} />
          </Stack.Group>)
          : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login">
                {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />}
              </Stack.Screen>
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Group>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}