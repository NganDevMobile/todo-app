import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouterNames } from '@common';
import BottomTab from './CustomNavigation';
import AddScreen from 'screens/add';
import { colors } from 'utils';
import SplashScreen from 'screens/splash';
import AddCategoryScreen from 'screens/addCategory';
import StatusTaskScreen from 'screens/statusTasks';
import CategoryTaskScreen from 'screens/categoryTasks';
import TaskDetailScreen from 'screens/taskDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Stack.Navigator
        initialRouteName={RouterNames.SPLASH_SCREEN}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={RouterNames.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen name={RouterNames.BOTTOM_TAB_BAR} component={BottomTab} />
        <Stack.Screen name={RouterNames.ADD_SCREEN} component={AddScreen} />
        <Stack.Screen
          name={RouterNames.ADD_CATEGORY_SCREEN}
          component={AddCategoryScreen}
        />
        <Stack.Screen
          name={RouterNames.STATUS_TASK_SCREEN}
          component={StatusTaskScreen}
        />
        <Stack.Screen
          name={RouterNames.CATEGORY_TASK_SCREEN}
          component={CategoryTaskScreen}
        />
        <Stack.Screen
          name={RouterNames.TASK_DETAIL_SCREEN}
          component={TaskDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
