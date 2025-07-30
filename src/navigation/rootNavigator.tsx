import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLoginResponse } from '../redux/stateSelector/authStateSelector';
import SplashScreen from '../screen/splashScreen/splashScreen';
import BottomTabNavigator from './bottomTabNavigation/bottomTabNavigation';
import AuthStack from './stackNavigation/authStackNavigator';

const RootNavigator = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const loginResponse = useSelector(getLoginResponse);

  useEffect(() => {

  console.log('Splash screen visible');
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getRouteName = () => {
    if (loginResponse?.token) {
      console.log('inside bottom')
      return <BottomTabNavigator/>;
    } else {
       console.log('inside Auth')
      return <AuthStack/>;
    }
  };

  return  splashVisible ? <SplashScreen /> :getRouteName();
  
  
  
};

export default RootNavigator;
