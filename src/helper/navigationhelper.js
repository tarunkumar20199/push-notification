import AsyncStorage from '@react-native-async-storage/async-storage';
export const LogoutScreen = async navigation => {
  console.log('navigation :', navigation);
  try {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error while logging out:', error);
  }
};
