import 'react-native-url-polyfill/auto'; // Must be at the very top

import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/rootNavigator';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { ToastComponent } from './src/utils/Toast';
import FCMHandler from './src/reusableComponent/fcmHandler/fcmHandler';
import Branch from 'react-native-branch';
import { MainRoutes } from './src/navigation/routeAndParamsList';
import { Linking } from 'react-native';
import BranchLinkHandler from './src/reusableComponent/branchHandler/branchHandler';
// Create navigation ref
export const navigationRef = createNavigationContainerRef();


const App = () => {
  console.log('🚀 App initialized');


  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
       
      <BranchLinkHandler />
        <NavigationContainer ref={navigationRef} fallback={<ActivityIndicator />}>
          <RootNavigator />
         
          <FCMHandler />
        </NavigationContainer>
        <ToastComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
