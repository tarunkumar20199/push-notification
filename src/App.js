/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View, PermissionsAndroid, Platform} from 'react-native';
import {
  getFcmToken,
  requestUserPermission,
  unsubscribeNotification,
} from './utils/push-notification-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const NotificationPermission = async () => {
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
  useEffect(() => {
    // requestUserPermission();
    getFcmToken();
    unsubscribeNotification();
    NotificationPermission();
  }, []);
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{color: 'black'}}>Hello World!</Text>
      </View>
    </>
  );
}
export default App;
