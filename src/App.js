import React, {useState, useEffect} from 'react';
import {NativeBaseProvider, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreen} from './components/Navigations/NavigationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithMobile} from './utils/Auth';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const userDetails = await AsyncStorage.getItem('user');
      const objectData = JSON.parse(userDetails);
      setData(objectData?.user?.uid);
    })();
    // signInWithMobile('+91 9588015952');
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
