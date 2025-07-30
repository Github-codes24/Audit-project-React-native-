import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoardScreen from '../../screen/dashboardScreen/dashboardScreen';
import complianceScreen from '../../screen/complianceScreen/complianceScreen';
import EligibityScreen from '../../screen/eligibilityScreen/eligibilityScreen';
import ResourceScreen from '../../screen/resourceScreen/resourceScreen';
import ContactScreen from '../../screen/contactScreen/contactScreen';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import RemainderListScreen from '../../screen/remainderListScreen.js/remainderListScreen';
import MainStackNavigation from '../stackNavigation/mainStacknavigation';
import ComplianceStack from '../stackNavigation/complianceStackNavigation';
import EligibilityStack from '../stackNavigation/eligibilityStackNavigation';
import ResourceStack from '../stackNavigation/resourceStackNavigation';
import RemainderStack from '../stackNavigation/remainderStackNavigation';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible && Platform.OS === 'android') return null;

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
            style={[styles.tabBarItem, { borderTopColor: borderColor }]}
          >
            {options.tabBarIcon && options.tabBarIcon({ color: iconColor, size: 24 })}
            <Text style={{ color: textColor, fontSize: theme.fontSizes.size_12 }}>{label}</Text>
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
        unmountOnBlur: true,
        keyboardHidesTabBar: true, 
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
        name="Eligibility"
        component={EligibilityStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => <Svg.ComplianceIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Compliance"
        component={ComplianceStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => <Svg.Eligibility color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Resource"
        component={ResourceStack}
        options={{
          tabBarIcon: ({ color, size }) => <Svg.Resource color={color} size={size} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (e && typeof e.preventDefault === 'function') {
              e.preventDefault();
            }
            navigation.navigate('Resource', {
              screen: 'ResourceScreen',
            });
          },
        })}
      />
      <Tab.Screen
        name="Reminder"
        component={RemainderStack}
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
    height:theme.verticalSpacing.space_70,
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
    paddingHorizontal:theme.horizontalSpacing.space_12,
  },
  tabBarItem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTopWidth: 3,
  },
});
