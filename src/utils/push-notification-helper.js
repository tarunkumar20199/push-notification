import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getFcmToken = async () => {
  try {
    let fcmToken = await messaging().getToken();
    console.log('fcmToken :', fcmToken);
  } catch (e) {
    console.log(e);
  }
};

export const unsubscribeNotification = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  return unsubscribe;
};

export const NotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (response === 'granted') {
        const fcmToken = getFcmToken();
        await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
      }
    } catch (error) {}
  }
};
