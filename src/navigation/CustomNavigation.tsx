import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from '@theme/icons';
import RouterName from '@common/RouterName';
import HomeScreen from 'screens/home';
import { colors } from 'utils';
import { isIOS, sizeScale } from '@common/Scale';
import FastImage from 'react-native-fast-image';
import CategoryScreen from 'screens/category';
import TaskScreen from 'screens/tasks';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  icon: Element;
  isFocused: boolean;
}

const CustomTabBarIcon = (props: TabBarIconProps) => {
  const { icon, isFocused } = props;

  return (
    <View
      style={{
        alignItems: 'center',
        top: isIOS ? sizeScale(14) : 0,
      }}
    >
      <FastImage
        source={icon}
        resizeMode="contain"
        style={{
          width: sizeScale(24),
          height: sizeScale(24),
        }}
      />
      {isFocused && <View style={styles.circle} />}
    </View>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: sizeScale(60),
          position: 'absolute',
          bottom: sizeScale(25),
          left: sizeScale(20),
          right: sizeScale(20),
          borderRadius: sizeScale(15),
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name={RouterName.INDEX_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={focused ? icons.homeFocused : icons.home}
              isFocused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouterName.TASK_SCREEN}
        component={TaskScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={focused ? icons.taskFocused : icons.task}
              isFocused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouterName.CATEGORY_SCREEN}
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={focused ? icons.categoryFocused : icons.category}
              isFocused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  circle: {
    width: sizeScale(4),
    height: sizeScale(4),
    backgroundColor: colors.primary,
    borderRadius: sizeScale(4),
    marginTop: sizeScale(4),
  },
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: sizeScale(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
