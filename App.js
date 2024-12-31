/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import RegisterLoginScreen from './src/screen/registerLoginScree/welcomeScreen';
import LoginScreen from './src/screen/authScreen/loginScreen';
import ForgotPasswordScreen from './src/screen/authScreen/forgotPasswordScreen';
import CreateNewPassword from './src/screen/authScreen/createNewPassword';
import StackNavigation from './src/navigation/stackNavigation/navigation';
const App=()=>{
  return(
    
    <View style={{flex:1}}>
      <StackNavigation/>
    </View>
  )
}

export default App;
