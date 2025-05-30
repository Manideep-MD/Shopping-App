import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {protectedScreensConfig} from './protectedScreensConfig';
// import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer
    // onReady={() => {
    //   SplashScreen.hide();
    // }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {protectedScreensConfig?.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
