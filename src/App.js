/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreen} from './components/Navigations/NavigationScreen';
import {
  NotificationPermission,
  getFcmToken,
} from './utils/push-notification-helper';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('user');
        const parseData = JSON.parse(userDetails);
        setData(parseData?.uid);
        await new Promise(resolve => setTimeout(resolve, 300));
        SplashScreen.hide();
        getFcmToken();
        NotificationPermission();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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
