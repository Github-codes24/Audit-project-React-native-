import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { getLoginResponse } from '../redux/stateSelector/authStateSelector';
import { MainRoutes } from './routeAndParamsList';
import MainStackNavigation from './stackNavigation/mainStacknavigation';
import { useSelector } from 'react-redux';
import AuthStack from './stackNavigation/authStackNavigator';


const RootNavigator = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const loginResponse = useSelector(getLoginResponse);

  console.log('loginResponse5555',loginResponse)
  const stack = createStackNavigator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getRouteName = () => {
    if (loginResponse?.token) {
        return <MainStackNavigation/>
    } else {
      return  <AuthStack/>
    }
  };

//   return splashVisible ? <SplashScreen /> : getRouteName();
  return  getRouteName();
};

export default RootNavigator;


