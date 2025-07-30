import 'react-native-url-polyfill/auto'; // Must be at the very top

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/rootNavigator';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { ToastComponent } from './src/utils/Toast';
import FCMHandler from './src/reusableComponent/fcmHandler/fcmHandler';
import Branch from 'react-native-branch';
import BranchLinkHandler from './src/reusableComponent/branchHandler/branchHandler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  const [isBranchHandled, setIsBranchHandled] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }

    const checkBranch = async () => {
      const params = await Branch.getLatestReferringParams();
      console.log('⏳ App.tsx Branch params:', params);
      setTimeout(() => {
        setIsBranchHandled(true);
      }, 1000);
    };

    checkBranch();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <BranchLinkHandler />
        <NavigationContainer ref={navigationRef} fallback={<ActivityIndicator />}>
          {isBranchHandled ? (
            <>
              <RootNavigator />
              <FCMHandler />
            </>
          ) : (
            <ActivityIndicator style={{ flex: 1 }} />
          )}
        </NavigationContainer>
        <ToastComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
