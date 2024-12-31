import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../routeAndParamsList';
import LoginScreen from '../../screen/authScreen/loginScreen';
import CreateNewPassword from '../../screen/authScreen/createNewPassword';
import WelcomeScreen from '../../screen/registerLoginScree/welcomeScreen';
import ForgotPasswordScreen from '../../screen/authScreen/forgotPasswordScreen';
import RegisterScreen from '../../screen/authScreen/registerScreen';
import RegisterCompanyScreen from '../../screen/authScreen/registerCompanyScreen';
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <BackgroundLayout>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MainRoutes.REGISTER_LOGIN_SCREEN}
    screenOptions={{
    headerShown: false, 
  }}
      >
        <Stack.Screen name={MainRoutes.WELCOME_SCREEN} component={WelcomeScreen} />
        <Stack.Screen name={MainRoutes.LOGIN_SCREEN} component={LoginScreen} />
     <Stack.Screen name={MainRoutes.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
     <Stack.Screen name={MainRoutes.CREATE_NEW_PASSWORD} component={CreateNewPassword} />
     <Stack.Screen name={MainRoutes.REGISTER_SCREEN} component={RegisterScreen}/>
     <Stack.Screen name={MainRoutes.REGISTER_COMPANY_SCREEN} component={RegisterCompanyScreen}/>

         
      </Stack.Navigator>
    </NavigationContainer>
    </BackgroundLayout>
  );
};

export default StackNavigation;
