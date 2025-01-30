import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { getLoginResponse } from '../redux/stateSelector/authStateSelector';
import { MainRoutes } from './routeAndParamsList';
import MainStackNavigation from './stackNavigation/mainStacknavigation';
import { useSelector } from 'react-redux';
import AuthStack from './stackNavigation/authStackNavigator';
import SplashScreen from '../screen/splashScreen/splashScreen';
import BottomTabNavigator from './bottomTabNavigation/bottomTabNavigation';

const RootNavigator = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const loginResponse = useSelector(getLoginResponse);

  
  const stack = createStackNavigator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getRouteName = () => {
    if (loginResponse?.token) {
        return <BottomTabNavigator/>
    } else {
      return  <AuthStack/>
    }
  };

  return splashVisible ? <SplashScreen /> : getRouteName();
  return  getRouteName();
};

export default RootNavigator;


