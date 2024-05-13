import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import icons from '@theme/icons';
import RouterName from '@common/RouterName';
import HomeScreen from 'screens/home';
import { colors } from 'utils';
import { sizeScale } from '@common/Scale';
import { RegularText } from '@components/Text';
import FastImage from 'react-native-fast-image';
import AddScreen from 'screens/add';
import CategoryScreen from 'screens/calendar';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = (props: BottomTabBarButtonProps) => (
  <View
    style={{
      backgroundColor: '#fff',
      width: 70,
      height: 70,
      top: -30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
    }}
  >
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 35,
          backgroundColor: colors.primary,
          shadowColor: '#000',
          shadowRadius: 10,
          shadowOpacity: 0.6,
          elevation: 1,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        }}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  </View>
);

interface TabBarIconProps {
  title: string;
  icon: Element;
}

const CustomTabBarIcon = (props: TabBarIconProps) => {
  const { icon, title } = props;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <FastImage
        source={icon}
        resizeMode="contain"
        style={{
          width: sizeScale(20),
          height: sizeScale(20),
          marginTop: sizeScale(8),
        }}
        tintColor={colors.white100Primary}
      />
      <RegularText
        style={{
          color: colors.white100Primary,
          marginTop: sizeScale(8),
        }}
      >
        {title}
      </RegularText>
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
          backgroundColor: colors.gray,
          height: sizeScale(100),
        },
      }}
    >
      <Tab.Screen
        name={RouterName.INDEX_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={focused ? icons.indexFocused : icons.index}
              title={'Index'}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={RouterName.ADD_SCREEN}
        component={AddScreen}
        options={{
          tabBarIcon: () => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FastImage
                source={icons.add}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      /> */}
      <Tab.Screen
        name={RouterName.CATEGORY_SCREEN}
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={focused ? icons.categoryFocused : icons.category}
              title={'Category'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
