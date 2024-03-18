/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreen} from './components/Navigations/NavigationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NotificationPermission,
  getFcmToken,
} from './utils/push-notification-helper';
import SplashScreen from 'react-native-splash-screen';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const userDetails = await AsyncStorage.getItem('user');
      const objectData = JSON.parse(userDetails);
      setData(objectData?.user?.uid);
    })();
    getFcmToken();
    NotificationPermission();
    SplashScreen.hide();
  }, [data]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <View bg={'white'} flex="1">
          <NavigationScreen userId={data} />
        </View>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
export default App;
