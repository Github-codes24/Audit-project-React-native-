import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setFcmToken } from '../../redux/stateSlice/authStateSlice';

const FCMHandler = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    } else {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('iOS notification permission not granted');
        } else {
          console.log('iOS notification permission granted:', authStatus);
        }
      } catch (err) {
        console.warn('Error requesting iOS permissions:', err);
      }
    }
  };

  const getFCMToken = async () => {
    try {

        await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      dispatch(setFcmToken(token));
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const setupNotificationHandlers = () => {
    // Foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('🔥 Foreground Message Received:', JSON.stringify(remoteMessage));
      await displayNotification(remoteMessage);
    });

    // Background opened notifications
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('🚀 App opened from background:', remoteMessage);
      handleNotificationNavigation(remoteMessage);
    });

    // App opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App opened from quit state:', remoteMessage);
          handleNotificationNavigation(remoteMessage);
        }
      });

    // Foreground notification click
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('🔎 Notification clicked in foreground:', detail.notification);
        handleNotificationNavigation(detail.notification);
      }
    });
  };

  const handleNotificationNavigation = (notificationData) => {
    const screen = notificationData?.data?.screen;
    const blogId = notificationData?.data?.blogId;

    if (screen && blogId) {
      console.log(`Navigating to ${screen} with blogId: ${blogId}`);
      navigation.navigate(screen, { id: blogId });
    } else {
      console.warn('⚠️ Missing screen or blogId in notification data');
    }
  };

  const displayNotification = async (remoteMessage) => {
    try {
      console.log('🔔 Attempting to display notification:', JSON.stringify(remoteMessage));

      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      const { notification, data } = remoteMessage;
     
      console.log('notification',notification,data)

      const title = notification?.title || data?.title || 'New Notification';
      const body = notification?.body || data?.message || 'You have a new message';

      console.log(`📢 Showing Notification: ${title} - ${body}`);

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
        data,
      });
    } catch (error) {
      console.error('🚨 Error displaying notification:', error);
    }
  };

  return null;
};

export default FCMHandler;
