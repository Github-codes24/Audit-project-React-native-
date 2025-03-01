import React, { useEffect } from 'react';
import { View, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/rootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ToastComponent } from './src/utils/Toast';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    requestPermissions();
    getFCMToken();
    setupNotificationHandlers();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android Notification permission denied');
        }
      } catch (err) {
        console.warn('Error requesting Android permissions:', err);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await request(PERMISSIONS.IOS.NOTIFICATIONS);
        if (permissionStatus !== 'granted') {
          console.log('iOS Notification permission denied');
        }
      } catch (err) {
        console.warn('Error requesting iOS permissions:', err);
      }
    }
  };

  const getFCMToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } else {
        console.log('FCM Permission not granted');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const setupNotificationHandlers = () => {
    messaging().onMessage(async remoteMessage => {
      const isLoggedIn = store.getState().auth.isLoggedIn; // Check login state
      if (!isLoggedIn) return; 

      console.log('Foreground Notification:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened from background state:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', remoteMessage);
        }
      });
  };

  const displayNotification = async remoteMessage => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || 'You have a new message',
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: { id: 'default' },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      {/* <ToastComponent /> */}
    </View>
  );
};

export default App;
