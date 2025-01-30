import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoardScreen from '../../screen/dashboardScreen/dashboardScreen';
import complianceScreen from '../../screen/complianceScreen/complianceScreen';
import EligibityScreen from '../../screen/eligibilityScreen/eligibilityScreen';
import ResourceScreen from '../../screen/resourceScreen/resourceScreen';
import ContactScreen from '../../screen/contactScreen/contactScreen';
import * as Svg from '../../asstets/images/svg'; // Import SVG icons
import { theme } from '../../utils';
import RemainderListScreen from '../../screen/remainderListScreen.js/remainderListScreen';
import MainStackNavigation from '../stackNavigation/mainStacknavigation';
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconColor = isFocused ? theme.lightColor.brownColor : 'gray';
        const textColor = isFocused ? theme.lightColor.brownColor : 'gray';
        const borderColor = isFocused ? theme.lightColor.brownColor : 'transparent';

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabBarItem, { borderTopColor: borderColor }]}>
            {options.tabBarIcon && options.tabBarIcon({ color: iconColor, size: 24 })}
            <Text style={{ color: textColor, fontSize:theme.fontSizes.size_12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigation}
        options={{
        tabBarIcon: ({ color, size }) => <Svg.HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Compliance"
        component={complianceScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Svg.ComplianceIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Eligibity"
        component={EligibityScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Svg.Eligibility color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Resource"
        component={ResourceScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Svg.Resource color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Remainder"
        component={RemainderListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Svg.RemianderIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: theme.lightColor.whiteColor,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    borderTopColor: '#F2F3F5',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  tabBarItem: {
    // backgroundColor:"red",
    paddingHorizontal:10,
    // width: theme.horizontalSpacing.space_64,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTopWidth: 3,
  },
});
