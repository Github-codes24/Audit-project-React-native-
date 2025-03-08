import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useDispatch } from 'react-redux';
import { setFcmToken } from '../../redux/stateSlice/authStateSlice';

const FCMHandler = () => {
  const dispatch = useDispatch();

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
        dispatch(setFcmToken(token));
      } else {
        console.log('FCM Permission not granted');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const setupNotificationHandlers = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('🔥 Foreground Message Received:', JSON.stringify(remoteMessage));

      if (!remoteMessage) {
        console.warn('⚠️ No remoteMessage received');
        return;
      }

      await displayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened from background:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', remoteMessage);
        }
      });
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
      const title = notification?.title || data?.title || 'New Notification';
      const body = notification?.body || data?.message || 'You have a new message';

      console.log(`📢 Showing Notification: ${title} - ${body}`);

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: { id: 'default' },
        },
      });
    } catch (error) {
      console.error('🚨 Error displaying notification:', error);
    }
  };

  return null;
};

export default FCMHandler;
