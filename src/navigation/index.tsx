// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouterNames } from '@common';
import { SignIn, SignUp } from 'screens/authenticate';
import HomeScreen from 'screens/home';
import TaskScreen from 'screens/tasks';
import BottomTab from './CustomNavigation';
import AddScreen from 'screens/add';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
      // translucent
      // barStyle="dark-content"
      // backgroundColor={'transparent'}
      />
      <Stack.Navigator
        initialRouteName={RouterNames.BOTTOM_TAB_BAR}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={RouterNames.BOTTOM_TAB_BAR} component={BottomTab} />
        <Stack.Screen name={RouterNames.ADD_SCREEN} component={AddScreen} />

        {/* <Stack.Screen name={RouterNames.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={RouterNames.SIGN_IN} component={SignIn} />
        <Stack.Screen name={RouterNames.SIGN_UP} component={SignUp} />
        <Stack.Screen name={RouterNames.TASK_SCREEN} component={TaskScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
