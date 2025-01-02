import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../routeAndParamsList';
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';
import { ToastComponent } from '../../utils/Toast';
import BottomTabNavigator from '../bottomTabNavigation/bottomTabNavigation';


const Stack = createStackNavigator();
const MainStackNavigation = () => {
  return (
   
      <Stack.Navigator 
    screenOptions={{
    headerShown: false, 
  }}
      >
         <Stack.Screen
        name={MainRoutes.DASHBOARD_SCREEN}
        component={BottomTabNavigator} 
      />
    {/* <Stack.Screen name={MainRoutes.DASHBOARD_SCREEN} component={DashBoardScreen}/>     */}
   

      </Stack.Navigator>
     
   
    
  );
};

export default MainStackNavigation;
